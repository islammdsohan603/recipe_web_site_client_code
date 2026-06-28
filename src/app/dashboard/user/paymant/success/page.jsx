'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

function SuccessContent() {
  const searchParams = useSearchParams();

  const sessionId = searchParams?.get('session_id') || '';
  const recipeId = searchParams?.get('recipeId') || '';

  const { data: session } = useSession();

  const userEmail = session?.user?.email ?? null;

  const [isSaving, setIsSaving] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const savePaymentToDb = async () => {
      if (!sessionId || !recipeId || !userEmail) return;

      try {
        await fetch(`${baseUrl}/api/save-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            recipeId,
            userEmail,
            recipeName: 'Premium Recipe',
            price: 4.99,
          }),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    };

    savePaymentToDb();
  }, [sessionId, recipeId, userEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <CheckCircle2 size={60} className="text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold">Payment Successful</h1>

        <p>{isSaving ? 'Saving...' : 'Your purchase is complete'}</p>

        <Link href="/dashboard/user/purchased" className="text-green-400">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
