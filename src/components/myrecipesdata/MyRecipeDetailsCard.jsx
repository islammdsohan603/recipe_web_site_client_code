import {
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  Clock,
  Utensils,
  BookOpen,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MyRecipeDetailsCard = ({ viewData }) => {
  const {
    recipeName,
    category,
    cuisineType,
    difficulty,
    prepTime,
    image,
    ingredients = [],
    steps = [],
  } = viewData;

  return (
    <div className=" bg-[#0c0604] min-h-screen py-16 ">
      <div className="max-w-6xl mx-auto space-y-8 pb-16 px-4 sm:px-6">
        {/* Back Button */}
        <div className="flex items-center justify-start">
          <Link
            href="/dashboard/user"
            className="inline-flex items-center gap-2 text-xs md:text-sm   text-white font-bold bg-[#ff6a00] p-4 rounded-2xl transition-colors group  "
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            <span className="font-sans tracking-wide">Back to Explore</span>
          </Link>
        </div>

        {/* Main Hero Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#110c0a] border border-orange-950/40 p-6 md:p-8 rounded-3xl shadow-2xl items-center relative overflow-hidden">
          {/* Decorative Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Recipe Image Wrap */}
          <div className="relative lg:col-span-5 aspect-[4/3] lg:h-[320px] w-full rounded-2xl overflow-hidden border border-orange-950/20 bg-[#1f1411] shadow-xl">
            {image ? (
              <Image
                src={image}
                alt={recipeName || 'Recipe Detail'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 gap-2">
                <Utensils size={32} className="text-zinc-700" />
                <span className="text-sm">No Image Available</span>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Quick Details Wrap */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {category || 'Main Course'}
                </span>
                <span className="text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800">
                  {cuisineType || 'International'}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif text-orange-100 tracking-wide font-medium leading-tight">
                {recipeName || 'Untitled Recipe'}
              </h1>
            </div>

            {/* Feature Grid Infographics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-orange-950/30">
              {/* Prep Time */}
              <div className="bg-[#18110e] p-3 rounded-xl border border-orange-950/20 flex items-center gap-3">
                <Clock size={18} className="text-orange-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">
                    Prep Time
                  </p>
                  <p className="text-xs text-zinc-200 font-medium">
                    {prepTime ? `${prepTime} Mins` : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Difficulty */}
              <div className="bg-[#18110e] p-3 rounded-xl border border-orange-950/20 flex items-center gap-3">
                <ChefHat size={18} className="text-orange-300 shrink-0" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">
                    Difficulty
                  </p>
                  <p className="text-xs text-zinc-200 font-medium capitalize">
                    {difficulty || 'Beginner'}
                  </p>
                </div>
              </div>

              {/* Category */}
              <div className="bg-[#18110e] p-3 rounded-xl border border-orange-950/20 flex items-center gap-3">
                <Utensils size={16} className="text-zinc-400 shrink-0" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">
                    Cuisine
                  </p>
                  <p className="text-xs text-zinc-200 font-medium line-clamp-1">
                    {cuisineType || 'Custom'}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="bg-[#18110e] p-3 rounded-xl border border-orange-950/20 flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">
                    Status
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Ingredients & Steps */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Ingredients Block */}
          <div className="md:col-span-5 bg-[#110c0a] border border-orange-950/20 p-6 md:p-8 rounded-2xl space-y-5 shadow-lg">
            <h2 className="text-xl font-serif text-orange-200 pb-3 border-b border-orange-950/20 flex items-center justify-between font-normal">
              <span>Ingredients</span>
              <span className="text-[11px] font-sans text-orange-400 font-normal bg-orange-500/10 border border-orange-500/10 px-2.5 py-0.5 rounded-full">
                {ingredients.length} Items
              </span>
            </h2>

            {ingredients.length > 0 ? (
              <ul className="space-y-3.5">
                {ingredients.map((ingredient, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 group text-sm text-zinc-300 border-b border-zinc-900/50 pb-2 last:border-0"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="group-hover:text-neutral-100 transition-colors leading-relaxed">
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-zinc-500 italic">
                No ingredients listed.
              </p>
            )}
          </div>

          {/* Instructions Steps Block */}
          <div className="md:col-span-7 bg-[#110c0a] border border-orange-950/20 p-6 md:p-8 rounded-2xl space-y-5 shadow-lg">
            <h2 className="text-xl font-serif text-orange-200 pb-3 border-b border-orange-950/20 flex items-center gap-2 font-normal">
              <BookOpen size={18} className="text-orange-400" />
              <span>Cooking Instructions</span>
            </h2>

            {steps.length > 0 ? (
              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group items-start">
                    {/* Step Number Badge */}
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
                      {idx + 1}
                    </div>
                    {/* Step Detail */}
                    <div className="space-y-1 pt-0.5">
                      <p className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">
                No instructions listed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipeDetailsCard;
