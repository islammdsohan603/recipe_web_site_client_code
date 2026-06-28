export const dynamic = 'force-dynamic';

import MyRecipeData from '@/components/myrecipesdata/MyRecipeData';
import { createNewRecipeData } from '@/db/recipedata';
import React from 'react';

const MyRecipepage = async () => {
  const data = (await createNewRecipeData()) ?? [];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-orange-200 font-bold mb-2">
            My Recipe Data
          </h1>
          <p className="text-zinc-400 text-sm">
            Manage and review all your culinary masterpieces in one place.
          </p>
        </div>

        {/* Professional Table Wrapper */}
        <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-[#111111]">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-zinc-800 bg-[#161616] text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Recipe</th>
                <th className="py-4 px-6">Category / Info</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-zinc-900">
              {data?.map(newrecipe => (
                <MyRecipeData key={newrecipe._id} newrecipe={newrecipe} />
              ))}
            </tbody>
          </table>

          {/* Empty State Handler */}
          {data?.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              No recipes found. Start creating one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRecipepage;
