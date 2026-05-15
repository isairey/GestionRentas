'use client';
import { useState, useRef,   } from 'react';
import { ArrowLeft,   Phone, Video, Info,   MessageSquare, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ChatWindow from '@/app/components/Chatwindow';
import swal from 'sweetalert2';
import { useTenant } from '@/app/hooks/useTenant';

export default function MessagesPage() {
  const [showChat, setShowChat] = useState(false);
  const { tenant } = useTenant();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prank = () => {
    swal.fire({
      title: "Not currently supported",
      text: "Call, video, and info features coming soon!",
      icon: "info",
      confirmButtonText: 'Okay',
      background: '#1f2937',
      color: 'white',
      confirmButtonColor: '#3b82f6'
    });
  };

  if (!tenant) {
    return (
      <div className="min-h-screen bg-[#060219] flex items-center justify-center p-8">
        <div className="text-center">
     
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Loading chat...</h2>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060219] text-white flex flex-col">
   
      <div className="sticky top-0 bg-gradient-to-r from-[#060219] to-[#0a0429] border-b border-gray-800 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/tenant" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl">Landlord</h1>
                  <p className="text-gray-400 text-sm">Room {tenant.roomNumber}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={prank} className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button onClick={prank} className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button onClick={prank} className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
 
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
           
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Ready to chat</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              Tap the message button below to start a live conversation with your landlord 
              about maintenance, payments, or any other concerns.
            </p>
            <div className="w-24 h-24 bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer"
                 onClick={() => setShowChat(true)}>
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-500 text-sm mt-4">Live chat with landlord</p>
          </div>
        </div>
      </div>
 

       {showChat && tenant && (
        <ChatWindow
          roomNumber={tenant.roomNumber}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}
