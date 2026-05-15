'use client';
import { useState } from 'react';
import { Send, MessageCircle, X, User } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useTenant } from '../hooks/useTenant';

interface ChatWindowProps {
  roomNumber: string;
  onClose: () => void;
}

export default function ChatWindow({ roomNumber, onClose }: ChatWindowProps) {
  const [message, setMessage] = useState('');
   
  
  const { tenant } = useTenant();
  const { messages, sendMessage,  messagesEndRef } = useChat(roomNumber);
  
  const senderName = tenant?.name?.split(' ')[0] || 'Tenant';

   

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim(), senderName);
      setMessage('');
     }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
        
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Landlord - Room {roomNumber}</h2>
              <p className="text-gray-400 text-sm">Live chat support</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === senderName ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.sender === senderName
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-800 text-white rounded-bl-sm'
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-xs opacity-75 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
     
          
          <div ref={messagesEndRef} />
        </div>

     
        <form onSubmit={handleSend} className="p-6 border-t border-gray-700">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                onKeyDown={(e) => e.key === 'Enter' && handleSend}
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-3 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-200 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
