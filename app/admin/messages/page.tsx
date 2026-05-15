'use client';
import { useState, useEffect }  from 'react'
import ChatWindow from '@/app/components/Chatwindow';
import { Search, MessageCircle } from 'lucide-react';

interface Tenant {
  _id: string;
  name: string;
  roomNumber: string;
}

export default function AdminChatHub() {
   
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showChat, setShowChat] = useState(false);

  
  useEffect(() => {
    const loadTenants = async () => {
      try {
        const res = await fetch('/api/tenants'); 
        if (!res.ok) throw new Error('Failed to fetch tenants');
        const data = await res.json();
        setTenants(data.tenants || data || []); 
      } catch (err) {
        console.error('Failed to load tenants:', err);
        setTenants([]);  
      } finally {
        setLoading(false);
      }
    };
    loadTenants();
  }, []);

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.roomNumber.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060219] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading tenants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060219] p-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Live Chat Hub</h1>
          <p className="text-gray-400 mt-1">Instant messaging with tenants</p>
        </div>
        <div className="text-sm text-gray-400">
          {tenants.length} tenants online
        </div>
      </div>

       <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tenants by name or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No tenants found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          filteredTenants.map((tenant) => (
            <div
              key={tenant._id}
              className="group cursor-pointer p-6 bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/50 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl"
              onClick={() => {
                setSelectedTenant(tenant);
                setShowChat(true);
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                  <span className="text-2xl font-bold text-white drop-shadow-lg">
                    {tenant.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl leading-tight truncate">{tenant.name}</h3>
                  <p className="text-blue-400 font-semibold text-lg mt-1">Room {tenant.roomNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" />
                <span className="text-sm text-green-400 font-medium">Start live chat</span>
              </div>
            </div>
          ))
        )}
      </div>

      
      {showChat && selectedTenant && (
        <ChatWindow
          roomNumber={selectedTenant.roomNumber}
          onClose={() => {
            setShowChat(false);
            setSelectedTenant(null);
          }}
        />
      )}
    </div>
  );
}
