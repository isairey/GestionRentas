 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, Home, Shield, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'tenant' | 'admin'>('tenant');
  const [formData, setFormData] = useState({ 
    roomNumber: '', 
    password: '', 
    rememberMe: false 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

     if (!formData.roomNumber || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        identifier: formData.roomNumber.trim(),
        password: formData.password.trim(),
        role: loginType,
      };

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          identifier: formData.roomNumber.trim(),
          password: formData.password.trim(),
          role: loginType,
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();

        throw new Error("Server returned an error. Please check server logs.");
      }

      const data = await res.json();
      

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      if (mounted && typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
      }

 
      if (loginType === 'admin') {
        router.push('/admin');
      } else {
        router.push('/tenant');
      }

    } catch (err: unknown) {
       if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
     if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-[#060219]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Welcome Back to</span>
                  <span className="block text-transparent bg-clip-text bg-blue-700">
                    Titan Rental
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Access your tenant dashboard, pay rent, report issues, and communicate with your landlord, all in one secure place.
                </p>
              </div>

              <div className="mb-10">
                <div className="inline-flex bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
                  <button
                    onClick={() => {
                      setLoginType('tenant');
                      setError('');
                    }}
                    className={`px-6 cursor-pointer py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${
                      loginType === 'tenant' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    Tenant Login
                  </button>
                  <button
                    onClick={() => {
                      setLoginType('admin');
                      setError('');
                    }}
                    className={`px-6 cursor-pointer py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${
                      loginType === 'admin' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    Admin Login
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  What you can do after login:
                </h3>
                
                {[
                  {  title: 'Pay Rent' },
                  {  title: 'Report Issues' },
                  {   title: 'Message Landlord' },
                  {   title: 'View Updates'},
                  { title: 'Access Documents' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                  
                    <div>
                      <h4 className="text-white font-medium">{feature.title}</h4>
                       
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-900/20">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {loginType === 'tenant' ? 'Tenant Login' : 'Admin Login'}
                  </h2>
                  <p className="text-gray-400">
                    {loginType === 'tenant' 
                      ? 'Enter your room number and password' 
                      : 'Enter admin credentials'
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      {loginType === 'tenant' ? 'Room Number' : 'Admin ID'}
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {loginType === 'tenant' ? (
                          <Home className="w-5 h-5 text-gray-500" />
                        ) : (
                          <User className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleInputChange}
                        placeholder={loginType === 'tenant' ? "e.g., 101, 205, 312" : "Admin username"}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Password
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 cursor-pointer h-5 text-gray-500 hover:text-gray-300" />
                        ) : (
                          <Eye className="w-5 cursor-pointer h-5 text-gray-500 hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-blue-600 focus:ring-blue-600 focus:ring-2"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-gray-300 text-sm">
                        Remember me on this device
                      </label>
                    </div>
                    
                    <Link 
                      href="/auth/reset" 
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {error && (
                    <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4">
                      <p className="text-red-200 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300   flex items-center justify-center gap-3 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In to Dashboard
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;