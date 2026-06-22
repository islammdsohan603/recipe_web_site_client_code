'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Clock,
  Heart,
  ChefHat,
  Utensils,
  User,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

const RecipeDetailsCard = ({ recipedetails }) => {
  const {
    recipeName,
    recipeImage,
    category,
    cuisineType,
    difficultyLevel,
    preparationTime,
    ingredients = [],
    instructions = [],
    authorName,
    likesCount,
  } = recipedetails || {};

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs md:text-sm text-neutral-400 hover:text-[#e6bfa3] transition-colors group py-1"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-sans tracking-wide">Back to Explore</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#16100e] border border-orange-950/20 p-6 md:p-8 rounded-3xl shadow-2xl items-stretch">
        <div className="relative lg:col-span-5 aspect-4/3 lg:aspect-auto min-h-[300px] lg:min-h-[400px] w-full rounded-2xl overflow-hidden bg-[#1f1411] shadow-inner">
          {recipeImage ? (
            <Image
              src={recipeImage}
              alt={recipeName || 'Recipe Detail'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-600 text-sm">
              No Image Available
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-[#e05320]/10 text-[#fca5a5] border border-[#e05320]/20">
                {category || 'Main Course'}
              </span>
              <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-md bg-white/5 text-neutral-400 border border-white/10">
                {cuisineType || 'Cuisine'}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-serif text-[#e6bfa3] tracking-wide font-normal leading-tight">
                {recipeName}
              </h1>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 bg-[#291e1b] hover:bg-[#382a26] border border-orange-950/20 px-4 py-2 rounded-xl transition-all cursor-pointer group select-none shrink-0"
              >
                <Heart
                  size={18}
                  className={`transition-colors duration-300 ${
                    isLiked
                      ? 'fill-red-500 text-red-500'
                      : 'text-neutral-400 group-hover:text-red-400'
                  }`}
                />
                <span className="text-xs font-medium text-neutral-300">
                  {isLiked ? (likesCount || 0) + 1 : likesCount || 0}
                </span>
              </button>
            </div>

            {authorName && (
              <div className="flex items-center gap-2 text-sm text-neutral-400 font-sans pt-1">
                <User size={16} className="text-neutral-500" />
                <span>
                  Recipe by{' '}
                  <span className="text-neutral-200 font-medium">
                    {authorName}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-orange-950/10">
            <div className="bg-[#211714] p-3 rounded-xl border border-orange-950/10 flex items-center gap-3">
              <Clock size={20} className="text-[#e05320]" />
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                  Prep Time
                </p>
                <p className="text-xs text-neutral-200 font-medium whitespace-nowrap">
                  {preparationTime || 'N/A'}
                </p>
              </div>
            </div>

            <div className="bg-[#211714] p-3 rounded-xl border border-orange-950/10 flex items-center gap-3">
              <ChefHat size={20} className="text-[#e6bfa3]" />
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                  Difficulty
                </p>
                <p className="text-xs text-neutral-200 font-medium capitalize">
                  {difficultyLevel || 'Easy'}
                </p>
              </div>
            </div>

            <div className="bg-[#211714] p-3 rounded-xl border border-orange-950/10 flex items-center gap-3">
              <Utensils size={18} className="text-neutral-400" />
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                  Type
                </p>
                <p className="text-xs text-neutral-200 font-medium line-clamp-1">
                  {category || 'Veg/Non-Veg'}
                </p>
              </div>
            </div>

            <div className="bg-[#211714] p-3 rounded-xl border border-orange-950/10 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                  Status
                </p>
                <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
                  Verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Ingredients */}
        <div className="md:col-span-5 bg-[#16100e] border border-orange-950/10 p-6 md:p-8 rounded-2xl space-y-5">
          <h2 className="text-xl font-serif text-[#e6bfa3] pb-3 border-b border-orange-950/10 flex items-center gap-2 font-normal">
            <span>Ingredients</span>
            <span className="text-xs font-sans text-neutral-500 font-normal bg-neutral-900 px-2 py-0.5 rounded-full">
              {ingredients.length} Items
            </span>
          </h2>

          <ul className="space-y-3.5">
            {ingredients.map((ingredient, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 group text-sm text-neutral-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#e05320] mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-neutral-100 transition-colors">
                  {ingredient}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="md:col-span-7 bg-[#16100e] border border-orange-950/10 p-6 md:p-8 rounded-2xl space-y-5">
          <h2 className="text-xl font-serif text-[#e6bfa3] pb-3 border-b border-orange-950/10 font-normal">
            Cooking Instructions
          </h2>

          <div className="space-y-6">
            {instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#291e1b] border border-orange-950/30 text-xs font-medium text-[#e6bfa3] shrink-0 group-hover:bg-[#e05320] group-hover:text-white transition-all duration-300">
                  {idx + 1}
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed group-hover:text-neutral-100 transition-colors pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsCard;
