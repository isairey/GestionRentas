"use client";

import { useState, useRef, useEffect } from "react";
import { useTenants } from "@/app/context/TenantsContext";
import Link from "next/link";
import {ArrowLeft,Users,Smile,Send,Volume2,VolumeX,} from "lucide-react";

type GroupMessage = {
  id: number;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
};

export default function DiscussionsPage() {
  const { tenants, loading } = useTenants();
  
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [muted, setMuted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: GroupMessage = {
      id: Date.now(),
      userId: "me",
      userName: "You",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

 
     setTimeout(() => {
      if (tenants.length === 0) return;
      
      const randomTenant = tenants[Math.floor(Math.random() * tenants.length)];
      const replyTexts = ["Good point!", "Agreed", "Thanks for sharing", "I see what you mean", "That makes sense"];
      const randomText = replyTexts[Math.floor(Math.random() * replyTexts.length)];

      const tenantReply: GroupMessage = {
        id: Date.now() + 1,
        userId: randomTenant._id,
        userName: randomTenant.name,
        text: randomText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: false,
      };

      setMessages((prev) => [...prev, tenantReply]);
    }, 2000);
  };

  const prank = () => {
    alert("Not currently supported")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-gray-900  to-gray-950 flex flex-col">
       <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/tenant"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500  rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-semibold">Tenants Group</h1>
              <p className="text-sm text-gray-400">{tenants.length} members</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setMuted(!muted)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-gray-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

  

       <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: "calc(100vh - 240px)" }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500 max-w-md">
              Start the conversation! Send a message to connect with your fellow tenants.
            </p>
          </div>
        ) : (
          <>
             <div className="flex items-center justify-center my-4">
              <div className="bg-gray-800/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="text-xs text-gray-400">Today</p>
              </div>
            </div>

             {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] ${
                    message.isMe
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  } rounded-2xl px-4 py-2 shadow-lg`}
                >
                  {!message.isMe && (
                    <p className="text-xs font-semibold text-blue-400 mb-1">
                      {message.userName}
                    </p>
                  )}
                  <p className="text-sm break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isMe ? "text-blue-200" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 p-4 sticky bottom-0">
        <form onSubmit={handleSendMessage} className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={prank}
              type="button"
              className="cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message in Tenants Group..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="cursor-pointer p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Messages are visible to all tenants in the building
          </p>
        </form>
      </div>
    </div>
  );
}