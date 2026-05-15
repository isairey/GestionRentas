 'use client';
import { useEffect, useState } from 'react';
import { Plus, Search, Mail, Phone, Home, Calendar, Edit, Trash2 } from 'lucide-react';
import RegisterTenantForm from '@/app/admin/tenants/Register';

interface Tenant {
  _id: string;            
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  rentAmount: number;
  moveInDate: string;
  gender: 'male' | 'female';
  lastPayment: string;
}

export default function TenantsPage() {
  const [registerForm, setRegisterForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const loadTenants = async () => {
      try {
        const res = await fetch('/api/tenant', { cache: 'no-store' });
        if (!res.ok) {
          const text = await res.text();
          console.error('TENANTS LORD ERROR', res.status, text);
          return;
        }
        const data: Tenant[] = await res.json();
        setTenants(data);
      } catch (err) {
        console.error('TENANTS FETCH ERROR', err);
      } finally {
        setLoading(false);
      }
    };
    loadTenants();
  }, []);


  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.roomNumber.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || tenant.gender === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleDeleteTenant = (id: string) => {
    if (confirm('Are you sure you want to delete this tenant?')) {
      setTenants(tenants.filter(tenant => tenant._id !== id));
    }
  };

  const handleAddTenant = (tenant: {
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  rentAmount: number;
  moveInDate: string;
  gender: "male" | "female";
  lastPayment: string;
}) => {
  const tenantWithId: Tenant = {
    _id: crypto.randomUUID(), 
    ...tenant
  };
  
  setTenants(prev => [...prev, tenantWithId]);
  setRegisterForm(false);
};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Tenants</h1>
          <p className="text-gray-400">Add, edit, or remove tenant information</p>
        </div>
        
        <button 
          onClick={() => setRegisterForm(true)}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b5015b] to-pink-600 hover:from-[#b5015b]/90 hover:to-pink-600/90 text-white font-medium rounded-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Register New Tenant
        </button>
      </div>

       {registerForm && (
        <RegisterTenantForm 
          onClose={() => setRegisterForm(false)}
          onSubmit={handleAddTenant}
        />
      )}

       <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search tenants by name, email, or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 cursor-pointer py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('male')}
            className={`px-4 cursor-pointer py-2 rounded-lg ${filterStatus === 'male' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Male
          </button>
          <button
            onClick={() => setFilterStatus('female')}
            className={`px-4 cursor-pointer py-2 rounded-lg ${filterStatus === 'female' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Female
          </button>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Total Tenants</p>
          <p className="text-2xl font-bold">{tenants.length}</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Male</p>
          <p className="text-2xl font-bold text-green-400">
            {tenants.filter(t => t.gender === 'male').length}
          </p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Female</p>
          <p className="text-2xl font-bold text-green-400">
            {tenants.filter(t => t.gender === 'female').length}
          </p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold">
            KES {tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

       <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Name</th>
                <th className="text-left p-4 text-gray-400 font-medium">Contact</th>
                <th className="text-left p-4 text-gray-400 font-medium">Room no.</th>
                <th className="text-left p-4 text-gray-400 font-medium">Rent</th>
                <th className="text-left p-4 text-gray-400 font-medium">Move-in Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Gender</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No tenants found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredTenants.map((tenant) => (
                  <tr key={tenant._id} className="border-t border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{tenant.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{tenant.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{tenant.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{tenant.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        <span className="font-medium"> {tenant.roomNumber}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">KES {tenant.rentAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">per month</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(tenant.moveInDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400 border border-green-700/30`}>
                        {tenant.gender.charAt(0).toUpperCase() + tenant.gender.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">

                        <button className="p-2 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4 text-blue-400" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTenant(tenant._id)}
                          className="p-2 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 cursor-pointer text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

       <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          Showing {filteredTenants.length} of {tenants.length} tenants
        </p>
      </div>
    </div>
  );
}
 

