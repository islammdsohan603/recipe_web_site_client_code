'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BrowseCard = ({ allrecipe }) => {
  const {
    _id,
    recipeName,
    recipeImage,
    cuisineType,
    preparationTime,
    difficulty,
    isTrending,
  } = allrecipe || {};

  // উইশলিস্ট/হার্ট বাটনের স্টেট
  const [isLiked, setIsLiked] = useState(false);

  // স্ক্রিনশটের মতো নিখুঁত ৩টি ডিফিকাল্টি সিগন্যাল বার রেন্ডার করার ফাংশন
  const renderSignalBars = level => {
    const lower = level?.toLowerCase();
    let active = 1;
    if (lower === 'medium' || lower === 'intermediate') active = 2;
    if (lower === 'hard' || lower === 'expert') active = 3;

    return (
      <div className="flex items-end gap-0.5 h-3">
        {[1, 2, 3].map(bar => (
          <div
            key={bar}
            className={`w-[2.5px] rounded-xs transition-colors duration-300 ${
              bar <= active ? 'bg-neutral-400 h-full' : 'bg-neutral-700 h-1.5'
            }`}
            style={{ height: bar === 1 ? '50%' : bar === 2 ? '75%' : '100%' }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-[#16100e] border border-orange-950/10 hover:border-orange-900/30 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 shadow-xl"
    >
      {/* ইমেজ সেকশন এবং টপ ব্যাজ */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#1f1411]">
        {recipeImage ? (
          <Image
            src={recipeImage}
            alt={recipeName || 'Recipe Image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
            No Image available
          </div>
        )}

        {/* ছবির ভেতরের টপ-লেফট ব্যাজ সমূহ */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {cuisineType && (
            <span className="text-[10px] font-medium tracking-wide px-2.5 py-0.5 rounded-md bg-black/60 text-neutral-200 backdrop-blur-xs">
              {cuisineType}
            </span>
          )}

          {/* ট্রেন্ডিং রেসিপির জন্য অরেঞ্জ ব্যাজ */}
          {(isTrending || _id === 'trending_dummy') && (
            <span className="text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-md bg-[#e05320] text-white">
              Trending
            </span>
          )}
        </div>
      </div>

      {/* কন্টেন্ট সেকশন (টাইটেল, মেটাডেটা ও বাটন) */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* রেসিপি টাইটেল এবং লাইক বাটন */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-serif text-[#e6bfa3] group-hover:text-orange-400 transition-colors duration-300 leading-snug line-clamp-2">
              {recipeName}
            </h3>

            <button
              onClick={e => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="text-neutral-500 hover:text-red-400 transition-colors pt-1 cursor-pointer shrink-0"
            >
              <Heart
                size={16}
                className={
                  isLiked ? 'fill-[#ffbfa3] text-[#ffbfa3]' : 'text-neutral-400'
                }
              />
            </button>
          </div>

          {/* সময় এবং সিগন্যাল বার */}
          <div className="flex items-center gap-3.5 text-[11px] text-neutral-400 pt-0.5">
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-neutral-500" />
              <span>{preparationTime || '30'} Min</span>
            </div>

            <div className="flex items-center gap-1.5">
              {renderSignalBars(difficulty)}
              <span className="capitalize">{difficulty || 'Easy'}</span>
            </div>
          </div>
        </div>

        {/* কার্ডের নিচের "View Details" বাটন */}
        <div className="pt-2">
          <Link href={`/details/${_id}`} className="block w-full">
            <button className="w-full cursor-pointer py-2 px-4 bg-[#291e1b] hover:bg-[#382a26] text-[#cca487] text-xs font-medium rounded-lg transition-colors duration-300 text-center border border-orange-950/20">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BrowseCard;
