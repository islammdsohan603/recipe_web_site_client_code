import BrowseSection from '@/components/browserecipedata/BrowseSection';
import { getAllRecipeData } from '@/db/recipedata';
import React from 'react';
import SelectDropdown from '@/components/browserecipedata/SelectDropdown';

const Browsepage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || 'all';

  const browseallrecipe = await getAllRecipeData(category);

  return (
    <div className="bg-[#0f0907] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-orange-950/10 mb-8">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl md:text-4xl font-serif text-[#e6bfa3] tracking-wide font-normal">
              Explore Recipes
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 font-sans">
              Showing {browseallrecipe?.length || 0} curated culinary
              masterpieces
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-start md:justify-end">
            <SelectDropdown />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {browseallrecipe?.map(allrecipe => (
            <BrowseSection key={allrecipe._id} allrecipe={allrecipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browsepage;
