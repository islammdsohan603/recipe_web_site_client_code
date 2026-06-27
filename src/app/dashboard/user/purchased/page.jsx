'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

const MyPurchasedPage = () => {
  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email;

  const [purchasedRecipes, setPurchasedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchPurchasedRecipes = async () => {
      if (!userEmail) {
        if (!isPending) {
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          `${baseUrl}/api/my-purchased-recipes?email=${encodeURIComponent(userEmail)}`,
          { cache: 'no-store' },
        );

        if (res.ok) {
          const data = await res.json();
          setPurchasedRecipes(data);
        }
      } catch (error) {
        console.error('Failed to load purchased recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchasedRecipes();
  }, [userEmail, isPending, baseUrl]);
  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0504] flex items-center justify-center text-white">
        <p className="text-xl font-medium animate-pulse">
          Loading your recipes...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0504] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <ShoppingBag className="text-green-500" size={28} />
          <h1 className="text-2xl md:text-3xl font-bold font-serif">
            My Purchased Recipes
          </h1>
        </div>

        {purchasedRecipes.length === 0 ? (
          <div className="bg-[#131111] border border-zinc-800 p-10 rounded-2xl text-center space-y-4">
            <p className="text-zinc-400">
              You haven't purchased any premium recipes yet.
            </p>
            <Link
              href="/browse"
              className="inline-block bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchasedRecipes.map(item => (
              <div
                key={item._id}
                className="bg-[#131111] border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-zinc-100 font-serif">
                    {item.recipeName || 'Premium Recipe'}
                  </h2>

                  <div className="flex flex-col gap-1.5 text-sm text-zinc-400">
                    <p className="flex items-center gap-2">
                      <DollarSign size={16} className="text-zinc-500" />
                      Price Paid:{' '}
                      <span className="text-green-400 font-semibold">
                        ${item.price}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 font-mono text-xs">
                      <Calendar size={14} className="text-zinc-500" />
                      Purchased on:{' '}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/details/${item.recipeId}`}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-center py-2.5 rounded-xl font-medium transition-all text-sm block"
                >
                  View Full Recipe
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchasedPage;
