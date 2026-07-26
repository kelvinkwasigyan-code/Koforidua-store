'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified authentication portal
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <p className="text-gray-500 font-medium">Redirecting to authentication portal...</p>
    </div>
  );
}
