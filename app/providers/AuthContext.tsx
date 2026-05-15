 'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Role = 'tenant' | 'admin' | null;

type AuthContextType = {
  isLoggedIn: boolean;
  userRole: Role;
  setAuth: (value: { isLoggedIn: boolean; role: Role }) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role>(null);

   useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole') as Role;

    setIsLoggedIn(!!token);
    setUserRole(role ?? null);
  }, []);

  const setAuth = ({ isLoggedIn, role }: { isLoggedIn: boolean; role: Role }) => {
    setIsLoggedIn(isLoggedIn);
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}