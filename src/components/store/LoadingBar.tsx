'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Duration of the loading animation

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent overflow-hidden pointer-events-none">
      <div className="h-full bg-slate-950 dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] dark:shadow-[0_0_12px_rgba(255,255,255,0.8)] w-full origin-left animate-infinite-loading"></div>
    </div>
  );
}
