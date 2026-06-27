'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const MyFavoritesPage = () => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${baseUrl}/api/my-favorites?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setFavorites(data));
    }
  }, [session, baseUrl]);

  return (
    <div className="min-h-screen bg-[#0a0504] p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">My Favorite Recipes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map((fav, index) => (
          <motion.div
            key={fav._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* এখানে Link যোগ করা হয়েছে */}
            <Link href={`/details/${fav.recipeId || fav._id}`}>
              <div className="bg-[#131111] p-4 rounded-2xl border border-zinc-800 cursor-pointer h-full">
                {/* প্রয়োজনে ইমেজ যোগ করতে পারেন */}
                {fav.recipeImage && (
                  <Image
                    src={fav.recipeImage}
                    alt={fav.recipeName}
                    width={300}
                    height={280}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}
                <h2 className="text-xl font-bold">{fav.recipeName}</h2>
                <p className="text-zinc-400">Category: {fav.category}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyFavoritesPage;
