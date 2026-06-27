'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

const PymantSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const recipeId = searchParams.get('recipeId');

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isSaving, setIsSaving] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const savePaymentToDb = async () => {
      if (!sessionId || !recipeId || !userEmail) return;

      try {
        const res = await fetch(`${baseUrl}/api/save-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            recipeId,
            userEmail,
            recipeName: 'Premium Recipe',
            price: 4.99,
          }),
        });

        if (res.ok) {
          console.log('Payment saved to database successfully!');
        }
      } catch (error) {
        console.error('Failed to save payment to DB:', error);
      } finally {
        setIsSaving(false);
      }
    };

    savePaymentToDb();
  }, [sessionId, recipeId, userEmail]);

  return (
    <div className="min-h-screen bg-[#0a0504] flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full bg-[#131111] border border-zinc-800 p-8 rounded-2xl text-center shadow-2xl space-y-6">
        <div className="flex justify-center">
          <div className="bg-green-500/10 p-4 rounded-full text-green-400">
            <CheckCircle2 size={56} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-serif text-zinc-100">
            Payment Successful!
          </h1>
          <p className="text-sm text-zinc-400">
            {isSaving
              ? 'Saving your purchase to dashboard...'
              : 'Thank you for your purchase. Your payment has been processed securely.'}
          </p>
        </div>

        {sessionId && (
          <div className="bg-[#1c1919] p-3 rounded-xl border border-zinc-800/60 text-left">
            <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
              Payment ID
            </p>
            <p className="text-xs text-zinc-300 font-mono truncate mt-0.5">
              {sessionId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={`/dashboard/user/purchased`}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingBag size={16} />
            View My Recipes
          </Link>
          <Link
            href="/browse"
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-3 px-4 rounded-xl font-medium transition-all duration-300 text-sm flex items-center justify-center"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PymantSuccess;
