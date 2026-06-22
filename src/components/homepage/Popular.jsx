// app/popular/page.js (বা যেখানে আপনার PopularPage আছে)
import { getPopularData } from '@/db/recipedata'; // সঠিক পাথ ব্যবহার করুন
import React from 'react';
import PopularGrid from './PopularGrid';

const PopularPage = async () => {
  const popularData = await getPopularData();

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-300">
            Trending Now
          </h1>
          <p className="text-xl text-neutral-400 mt-2">
            Most loved by our community this week
          </p>
        </header>

        <div>
          <PopularGrid popularData={popularData} />
        </div>
      </div>
    </div>
  );
};

export default PopularPage;
