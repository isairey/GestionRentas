 'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, DollarSign, Bell, MessageSquare } from 'lucide-react';
import { useTenant, type Tenant } from '@/app/hooks/useTenant';

type DashboardTenant = {
  name: string;
  roomNumber: string;
  moveInDate: string;
  monthlyRent: number;
  nextPaymentDue: string;
  rentStatus: 'paid' | 'pending' | 'overdue';
  notifications: number;
  unreadMessages: number;
};

export default function TenantDashboard() {
  const { tenant, loading, error } = useTenant();
  const [dashboardTenant, setDashboardTenant] = useState<DashboardTenant | null>(null);

  
  useEffect(() => {
    if (tenant) {
      const today = new Date();
      const nextDue = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of month
      
      setDashboardTenant({
        name: tenant.name,
        roomNumber: tenant.roomNumber,
        moveInDate: tenant.moveInDate,
        monthlyRent: tenant.rentAmount,
        nextPaymentDue: nextDue.toLocaleDateString(),
        rentStatus: 'pending',  
        notifications: 3,  
        unreadMessages: 2,  
      });
    }
  }, [tenant]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060219] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !tenant || !dashboardTenant) {
    return (
      <div className="min-h-screen bg-[#060219] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Tenant data not found'}</p>
          <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

   const moveIn = new Date(tenant.moveInDate);
  const today = new Date();
  const monthsStayed = (today.getFullYear() - moveIn.getFullYear()) * 12 + 
                      (today.getMonth() - moveIn.getMonth());

  return (
    <div className="bg-[#060219] text-white">
      <div className="container mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{tenant.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{tenant.name}</h2>
                <p className="text-gray-400">Room {tenant.roomNumber}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Room Number</span>
                <span className="font-medium">{tenant.roomNumber}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Stayed Since</span>
                <span className="font-medium">
                  {new Date(tenant.moveInDate).toLocaleDateString()} ({monthsStayed} months)
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Monthly Rent</span>
                <span className="font-medium">KES {tenant.rentAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

           <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Rent Status</h2>
                <p className="text-gray-400">Current payment status</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-4 rounded-lg ${
                dashboardTenant.rentStatus === 'paid' 
                  ? 'bg-green-900/50 border border-green-700/30' 
                  : 'bg-yellow-900/50 border border-yellow-700/30'
              }`}>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  dashboardTenant.rentStatus === 'paid' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-yellow-600 text-white'
                }`}>
                  {dashboardTenant.rentStatus.toUpperCase()}
                </span>
                <span>Next due: {dashboardTenant.nextPaymentDue}</span>
              </div>
 
              <Link 
                href="/tenant/payments"
                className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg text-center transition-all duration-300"
              >
                Track Rent & Make Payment
              </Link>
            </div>
          </div>
        </div>

         <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/tenant/payments"
              className="bg-gray-900/50 border border-gray-700 hover:border-blue-500 rounded-xl p-4 text-center transition-colors"
            >
              <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <span className="text-sm">Pay Rent</span>
            </Link>
            
            <Link 
              href="/tenant/maintenance"
              className="bg-gray-900/50 border border-gray-700 hover:border-green-500 rounded-xl p-4 text-center transition-colors"
            >
              <Home className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <span className="text-sm">Maintenance</span>
            </Link>
            
            <Link 
              href="/tenant/messages"
              className="bg-gray-900/50 border border-gray-700 hover:border-purple-500 rounded-xl p-4 text-center transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <span className="text-sm">Messages</span>
            </Link>
            
            <Link 
              href="/tenant/updates"
              className="bg-gray-900/50 border border-gray-700 hover:border-yellow-500 rounded-xl p-4 text-center transition-colors"
            >
              <Bell className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <span className="text-sm">Updates</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


