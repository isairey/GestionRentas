 'use client';
import swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Bell, Shield, Eye, EyeOff, Mail, Smartphone, Home, Lock, Save, LogOut, AlertTriangle, RefreshCw } from 'lucide-react';
import { useTenant } from '@/app/hooks/useTenant';

export default function TenantSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {tenant, loading} = useTenant();
  const [sendRequest, setSendRequest] = useState(false)

   const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    roomNumber: '',
 
  });

  useEffect(() => {
    if(tenant && !loading){
      setProfile({
        name: tenant.name || "",
        email: tenant.email || "",
        phone: tenant.phone || "",
        roomNumber: tenant.roomNumber || "",
        })
    }
  }, [tenant, loading])

   const [notifications, setNotifications] = useState({
    rentReminders: true,
    maintenanceUpdates: true,
    announcements: true,
    paymentConfirmations: true,
    emailNotifications: true,
 
  });

   const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
     { id: 'account', label: 'Account', icon: <Lock className="w-4 h-4" /> },
  ];

  const handleSave = async () => {
    setSaving(true);
    //  API call
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  const handleChangeProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleChangeNotification = (field: string) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field as keyof typeof notifications] }));
  };

 

  const router = useRouter();
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      router.push('/login');
    }
  };

  const handleDeleteAccount = () => {
       
    swal.fire({
      title: "Denied",
      text: "You require special permissions to complete this action. Please contact the admin",
      icon: "error",
      confirmButtonText: 'okay',
      background: '#1f2937',
      color: 'white',
      confirmButtonColor: '#ef4444'
    })
  
  };

  return (
    <div className="min-h-screen bg-[#060219] text-white">
       <div className="sticky top-0 bg-gradient-to-r from-[#060219] to-[#0a0429] border-b border-gray-800 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/tenant"
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-gray-400 text-sm">Manage your account preferences</p>
              </div>
            </div>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
          
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>

             <div className="lg:col-span-3">
               {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <User className="w-5 h-5" />
                      Profile Information
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="text"
                              value={loading ? "Loading" : profile?.name}
                              onChange={(e) => handleChangeProfile('name', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="email"
                              value={profile.email}
                              onChange={(e) => handleChangeProfile('email', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="tel"
                              value={profile.phone}
                              onChange={(e) => handleChangeProfile('phone', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Room Number</label>
                          <div className="relative">
                            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type="text"
                              value={profile.roomNumber}
                              disabled
                              className="w-full pl-10 pr-4 py-3 bg-gray-800/30 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                              Cannot be changed
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

           
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </h2>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-white">Rent & Payments</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                            <div>
                              <p className="font-medium">Rent Due Reminders</p>
                              <p className="text-gray-400 text-sm">Get reminders before rent is due</p>
                            </div>
                            <button
                              onClick={() => handleChangeNotification('rentReminders')}
                              className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors ${
                                notifications.rentReminders ? 'bg-green-600' : 'bg-gray-700'
                              }`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications.rentReminders ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                            <div>
                              <p className="font-medium">Payment Confirmations</p>
                              <p className="text-gray-400 text-sm">Get notified when payments are confirmed</p>
                            </div>
                            <button
                              onClick={() => handleChangeNotification('paymentConfirmations')}
                              className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors ${
                                notifications.paymentConfirmations ? 'bg-green-600' : 'bg-gray-700'
                              }`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications.paymentConfirmations ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

         

               {activeTab === 'account' && (
                <div className="space-y-6">
                   <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <Lock className="w-5 h-5" />
                      Change Password
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Current Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={password.current}
                            onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                            className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">New Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                              type={showNewPassword ? "text" : "password"}
                              value={password.new}
                              onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                              className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Confirm New Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={password.confirm}
                              onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                              className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                      onClick={() => setSendRequest(true)}
                      className="w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300">
                        Update Password
                      </button>
                    </div>
                  </div>
                 
                  {sendRequest && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className='bg-gray-800 h-fit flex flex-col p-3 rounded'>
                      <p className='mb-4 flex text-center justify-center'>Password reset Request send to admin. You will be notified <br />once the process is completed. 
                        In the meantime, <br />use Your previous password
                      </p>
                      <button 
                      onClick={() => setSendRequest(false)}
                      className='bg-red-700 rounded w-fit m-auto p-3 px-3 py-2 cursor-pointer hover:bg-red-600 transition'>
                        OK
                      </button>
                    </div>
                    </div>
                  )}
                   

                  
                  <div className="bg-red-900/10 border border-red-700/30 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 text-red-400 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5" />
                      Danger Zone
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-red-900/20 rounded-lg">
                        <div>
                          <p className="font-medium text-white">Delete Account</p>
                          <p className="text-red-300 text-sm">Permanently delete your account and all data</p>
                        </div>
                        <button
                          onClick={handleDeleteAccount}
                          className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>


                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
