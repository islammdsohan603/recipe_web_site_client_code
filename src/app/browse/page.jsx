import BrowseSection from '@/components/browserecipedata/BrowseSection';
import { getAllRecipeData } from '@/db/recipedata';
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Browsepage = async () => {
  const browseallrecipe = await getAllRecipeData();

  return (
    <div className="bg-[#0f0907] text-white min-h-screen py-12">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-8 border-b border-orange-950/10 mb-8">
          <div className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-serif text-[#e6bfa3] tracking-wide">
              Explore Recipes
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 font-sans">
              Showing {browseallrecipe?.length || 0} curated culinary
              masterpieces
            </p>
          </div>
        </div>

        {/* 3 grid*/}
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
