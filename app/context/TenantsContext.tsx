"use client";
import { createContext, useContext, useState, useEffect } from "react";

export interface Tenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  rentAmount: number;
  moveInDate: string;
  gender: "male" | "female";
  lastPayment: string;
}

type TenantsContextType = {
  tenants: Tenant[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
  loading: boolean;
};

const TenantsContext = createContext<TenantsContextType | null>(null);

export function TenantsProvider({ children }: { children: React.ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenants = async () => {
      try {
        const res = await fetch('/api/tenant', { cache: 'no-store' });
        if (!res.ok) {
          const text = await res.text();
          console.error('TENANTS LOAD ERROR', res.status, text);
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

  return (
    <TenantsContext.Provider value={{ tenants, setTenants, loading }}>
      {children}
    </TenantsContext.Provider>
  );
}

export function useTenants() {
  const context = useContext(TenantsContext);
  if (!context) {
    throw new Error("useTenants must be used inside TenantsProvider");
  }
  return context;
}
