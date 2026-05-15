'use client';
import { useEffect, useState } from 'react';
import { Search, Calendar, CheckCircle, Edit,RefreshCw } from 'lucide-react';

interface RentPayment {
  _id: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
  lateFee: number;
}

export default function AdminRentTracking() {
  const [payments, setPayments] = useState<RentPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  useEffect(() => {
    loadRentPayments();
  }, []);

  const loadRentPayments = async () => {
    try {
      const res = await fetch('/api/rent', { cache: 'no-store' });
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.roomNumber.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="p-8 text-center">Loading rent payments...</div>;
  }

  const getStatusColor = (status: RentPayment['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-600 text-white';
      case 'pending': return 'bg-yellow-600 text-white';
      case 'overdue': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const totalRevenue = payments.reduce((sum, p) => sum + (p.status === 'paid' ? p.amount : 0), 0);
  const overdueCount = payments.filter(p => p.status === 'overdue').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6 p-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rent Tracking</h1>
          <p className="text-gray-400">Monitor rent payments and tenant status</p>
        </div>
        <button 
          onClick={() => loadRentPayments()}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-400">
            KES {totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Overdue</p>
          <p className="text-2xl font-bold text-red-400">{overdueCount}</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Total Tenants</p>
          <p className="text-2xl font-bold">{payments.length}</p>
        </div>
      </div>

       <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by tenant name or room number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'paid', 'pending', 'overdue'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 cursor-pointer py-2 rounded-lg font-medium transition-all ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

       <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Tenant</th>
                <th className="text-left p-4 text-gray-400 font-medium">Room</th>
                <th className="text-right p-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left p-4 text-gray-400 font-medium">Due Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Paid Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500">
                    No payments found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment._id} className="border-t border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{payment.tenantName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{payment.tenantName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{payment.roomNumber}</td>
                    <td className="p-4 text-right">
                      <div>
                        <p className="font-bold text-lg">KES {payment.amount.toLocaleString()}</p>
                        {payment.lateFee > 0 && (
                          <p className="text-sm text-red-400">+ KES {payment.lateFee} late fee</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(payment.dueDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      {payment.paidDate ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>{new Date(payment.paidDate).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => alert('Not currently supported')}
                      className="cursor-pointer p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Edit payment">
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

       <div className="text-center p-6 bg-gray-900 rounded-lg">
        <p className="text-gray-400">
          Showing {filteredPayments.length} of {payments.length} payments
        </p>
      </div>
    </div>
  );
}
