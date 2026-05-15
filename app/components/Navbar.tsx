 'use client';

import { useAuth } from '@/app/providers/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, userRole, setAuth } = useAuth();

  const navContents = {
    logo: '/logoipsum-292.svg',
    title: 'Titan Rental',  
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      router.push('/auth/login');
    }
    setAuth({ isLoggedIn: false, role: null });
  };

  return (
    <nav className="sticky top-0 z-50 p-3 border-b border-b-white bg-[#060219] shadow-sm">
      <div className="mx-auto flex justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image
              src={navContents.logo}
              alt="Titan Rental Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-bold text-2xl text-gray-300">
            {navContents.title}
          </h1>
        </Link>

        {!isLoggedIn ? (
          <Link
            href="/auth/login"
            className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-6 py-2 rounded-lg"
          >
            Login
          </Link>
        ) : userRole === 'tenant' ? (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <Link href="/tenant/tenant-dashboard" className="text-gray-300 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/tenant/payments" className="text-gray-300 hover:text-blue-600">
                Payments
              </Link>
              <Link href="/tenant/messages" className="text-gray-300 hover:text-blue-600">
                Messages
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-gradient-to-br from-red-500 to-red-800 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <Link href="/admin" className="text-gray-300 hover:text-blue-600">
                Admin Dashboard
              </Link>
              <Link href="/admin/tenants" className="text-gray-300 hover:text-blue-600">
                Tenants
              </Link>
              <Link href="/admin/messages" className="text-gray-300 hover:text-blue-600">
                Messages
              </Link>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">Landlord</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-gradient-to-br from-red-500 to-red-800 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
