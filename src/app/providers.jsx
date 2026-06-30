'use client';

import { ThemeProvider } from 'next-themes';
import { useSession } from '@/lib/auth-client';
import { ChefHat } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Providers({ children }) {
  const { isPending } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c0604] text-white">
        <ChefHat size={48} className="text-orange-500 animate-pulse mb-4" />
        <p className="text-orange-200/60 tracking-widest text-sm uppercase">
          Loading RecipeHub...
        </p>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="recipehub-theme"
    >
      {isPending && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0604]/80 backdrop-blur-sm text-white">
          <ChefHat size={48} className="text-orange-500 animate-bounce mb-4" />
          <p className="text-orange-200/80 tracking-widest text-sm font-semibold uppercase animate-pulse">
            Authenticating...
          </p>
        </div>
      )}
      {children}
    </ThemeProvider>
  );
}
