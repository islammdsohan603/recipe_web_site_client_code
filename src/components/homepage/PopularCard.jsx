'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';
import Link from 'next/link';

const cardEntranceVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const PopularRecipeCard = ({ popular }) => {
  const {
    _id,
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
    authorName,
    likesCount,
  } = popular || {};

  return (
    <motion.div
      variants={cardEntranceVariants}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(255, 109, 51, 0.12)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl bg-linear-to-b from-[#1a0f0c] to-[#0c0604] border border-orange-950/30 hover:border-orange-600/40 transition-colors duration-300 w-full flex flex-col md:flex-row h-full min-h-[240px]"
    >
      {/* Image Container  */}
      <div className="relative h-52 md:h-auto w-full md:w-2/5 shrink-0 overflow-hidden bg-[#1a0f0c] min-h-[220px]">
        {recipeImage ? (
          <Image
            src={recipeImage}
            alt={recipeName || 'Recipe Image'}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            No Image
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-transparent via-transparent to-[#0c0604]/90" />

        {/* Likes Count */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-md hover:bg-orange-500 px-3 py-1.5 rounded-full transition-colors duration-300 cursor-pointer z-10"
        >
          <Heart
            size={13}
            className="text-orange-500 fill-orange-500 group-hover:text-white group-hover:fill-white"
          />
          <span className="text-xs font-bold text-white">
            {likesCount || '0'}
          </span>
        </motion.div>
      </div>{' '}
      <div className="relative p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          {/* Recipe Name */}
          <h3 className="text-xl font-bold text-neutral-100 line-clamp-2 group-hover:text-orange-400 transition-colors duration-300 font-serif">
            {recipeName}
          </h3>

          {/* Category & Cuisine */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-medium border border-orange-500/20">
              {category}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-400 font-medium border border-white/10">
              {cuisineType}
            </span>
          </div>
        </div>

        {/* Time & Author */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Clock size={14} className="text-orange-500/80 shrink-0" />
            <span className="font-medium">{preparationTime || 'N/A'} mins</span>
          </div>

          {/* Author Info */}
          <div className="pt-3 border-t border-orange-950/20 flex items-center justify-between">
            <p className="text-xs text-neutral-500">
              By{' '}
              <span className="text-neutral-300 font-medium">
                {authorName || 'Unknown'}
              </span>
            </p>
          </div>
        </div>

        {/* Hover Action Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#0c0604]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
          <Link href={`/details/${_id}`} className="w-full pointer-events-auto">
            <button className="w-full cursor-pointer py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              View Recipe Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularRecipeCard;
