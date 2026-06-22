'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FeaturedCard from './FeaturedCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const FeaturedGrid = ({ featuredData }) => {
  return (
    <section className="bg-[#060302] text-white py-16 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header*/}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#e6bfa3] tracking-wide">
              Featured Creations
            </h2>
            <p className="text-sm text-neutral-400 mt-1.5 font-sans">
              Handpicked by our editorial team
            </p>
          </div>

          <Link
            href="/all-recipes"
            className="text-xs md:text-sm font-medium text-neutral-400 hover:text-orange-400 transition-colors duration-300"
          >
            View All
          </Link>
        </div>

        {/* Grid*/}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2   gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredData && featuredData.length > 0 ? (
            featuredData.map(recipe => (
              <FeaturedCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <div className="text-neutral-500 italic text-sm">
              No featured creations found.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGrid;
