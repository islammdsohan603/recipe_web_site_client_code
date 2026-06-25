'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const LikeButtton = ({ recipe }) => {
  const { likesCount } = recipe;

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer gap-2 bg-orange-500 px-5 py-3 rounded-xl text-white disabled:opacity-50"
      >
        <Heart size={18} />
        Like ({likesCount})
      </motion.button>
    </div>
  );
};

export default LikeButtton;
