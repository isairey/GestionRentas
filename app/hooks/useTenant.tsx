 'use client';

import { useEffect, useState } from 'react';

export interface Tenant {
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

export function useTenant() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const token = typeof window !== 'undefined' 
          ? localStorage.getItem('token') 
          : null;

        if (!token) {
          setError('Not authenticated');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load tenant');
          setLoading(false);
          return;
        }

        setTenant(data.tenant);
      } catch (err) {
        console.error('useTenant error:', err);
        setError('Failed to load tenant');
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, []);

  return { tenant, loading, error };
}
