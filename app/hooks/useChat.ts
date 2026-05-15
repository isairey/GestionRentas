'use client';
import { useEffect, useRef, useState } from 'react';
import * as ioModule from 'socket.io-client';

interface Message {
  message: string;
  sender: string;
  timestamp: string;
  socketId: string;
}

export function useChat(roomNumber: string) {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = (ioModule as any).default || ioModule;
    const socketIo = io('/api/chat', {
      path: '/api/chat',
      transports: ['websocket', 'polling']
    });

    setSocket(socketIo);
    socketIo.emit('join-room', roomNumber);

    socketIo.on('receive-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [roomNumber]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (message: string, sender: string) => {
    if (socket) {
      socket.emit('send-message', { roomNumber, message, sender });
    }
  };

  const emitTyping = (isTyping: boolean) => {
    if (socket) {
      socket.emit('typing', { roomNumber, isTyping });
    }
  };

  return {
    messages,
    sendMessage,
    emitTyping,
    messagesEndRef
  };
}
