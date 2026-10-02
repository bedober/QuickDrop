'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if admin token exists in cookies
        const userRole = document.cookie
          .split('; ')
          .find(row => row.startsWith('userRole='))
          ?.split('=')[1];
        
        const authToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];

        if (userRole === 'admin' && authToken) {
          setIsAuthorized(true);
        } else {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f3ee]">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Router will redirect
  }

  return <>{children}</>;
}
