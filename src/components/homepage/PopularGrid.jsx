'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PopularRecipeCard from './PopularCard'; // নিশ্চিত করুন পাথ ঠিক আছে

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // প্রতিটি কার্ডের মাঝে ০.২৫ সেকেন্ডের নিখুঁত ব্যবধান
    },
  },
};

const PopularGrid = ({ popularData }) => {
  return (
    <div className="w-full">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {popularData && popularData.length > 0 ? (
          popularData.map(popular => (
            <PopularRecipeCard key={popular._id} popular={popular} />
          ))
        ) : (
          <div className="text-neutral-500 italic p-4">
            No trending recipes found.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PopularGrid;
