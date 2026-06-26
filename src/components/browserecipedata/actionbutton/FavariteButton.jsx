'use client';

import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

const FavariteButton = ({ recipe }) => {
  console.log(recipe);
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer gap-2 bg-yellow-500 px-5 py-3 rounded-xl text-white disabled:opacity-50"
      >
        <Bookmark size={18} />
        Favorite
      </motion.button>
    </div>
  );
};

export default FavariteButton;
