'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Link from 'next/link';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const FeaturedCard = ({ recipe }) => {
  const {
    _id,
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
    difficulty,
  } = recipe || {};

  const renderDifficultyBars = level => {
    const lowerLevel = level?.toLowerCase();
    let activeBars = 1;
    if (lowerLevel === 'intermediate') activeBars = 2;
    if (lowerLevel === 'expert') activeBars = 3;

    return (
      <div className="flex items-end gap-0.5 h-3">
        {[1, 2, 3].map(bar => (
          <div
            key={bar}
            className={`w-[3px] rounded-xs transition-colors duration-300 ${
              bar <= activeBars
                ? 'bg-emerald-500 h-full'
                : 'bg-neutral-700 h-1.5'
            }`}
            style={{ height: bar === 1 ? '50%' : bar === 2 ? '75%' : '100%' }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      variants={cardVariants}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(255, 109, 51, 0.12)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl bg-linear-to-b from-[#1a0f0c] to-[#0c0604] border border-orange-950/30 hover:border-orange-600/40 transition-colors duration-300 w-full flex flex-col md:flex-row h-full min-h-[240px]"
    >
      {/* Image Section   */}
      <div className="relative h-52 md:h-auto w-full md:w-2/5 shrink-0 overflow-hidden bg-[#1a0f0c] min-h-[220px]">
        {recipeImage ? (
          <Image
            src={recipeImage}
            alt={recipeName || 'Recipe Image'}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 text-sm">
            No Image
          </div>
        )}

        {/* gradiant */}
        <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-transparent via-transparent to-[#0c0604]/90" />
      </div>

      {/* Content Section (ডেস্কটপে ডানে থাকবে) */}
      <div className="relative p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          {/* Recipe Name */}
          <h3 className="text-xl font-bold text-neutral-100 line-clamp-2 group-hover:text-orange-400 transition-colors duration-300 font-serif">
            {recipeName}
          </h3>

          {/* Category & Cuisine Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {category && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-medium border border-orange-500/20">
                {category}
              </span>
            )}
            {cuisineType && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-400 font-medium border border-white/10">
                {cuisineType}
              </span>
            )}
          </div>
        </div>

        {/* Time & Difficulty Footer */}
        <div className="space-y-3">
          <div className="pt-3 border-t border-orange-950/20 flex items-center justify-between">
            {/* Time*/}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Clock size={14} className="text-orange-500/80 shrink-0" />
              <span className="font-medium">{preparationTime || '0'} mins</span>
            </div>

            <div className="flex items-center gap-2">
              {renderDifficultyBars(difficulty)}
              <span className="text-xs text-neutral-400 capitalize font-medium">
                {difficulty || 'Easy'}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Action Button Overlay  */}
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

export default FeaturedCard;
