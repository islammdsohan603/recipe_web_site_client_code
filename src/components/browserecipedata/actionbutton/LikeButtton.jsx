'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { updateRecipeLike } from '@/db/recipedata';
import { toast } from 'react-toastify';

const LikeButtton = ({ recipe, userEmail }) => {
  const { _id, likesCount: initialLikes, likedBy = [] } = recipe || {};

  const [likes, setLikes] = useState(initialLikes || 0);
  const [isLiking, setIsLiking] = useState(false);

  const [hasLiked, setHasLiked] = useState(likedBy.includes(userEmail));

  const handleLike = async () => {
    if (isLiking || !_id) return;

    if (hasLiked) {
      toast.error('You have already liked this recipe!');
      return;
    }

    setIsLiking(true);

    setLikes(prev => prev + 1);
    setHasLiked(true);

    const result = await updateRecipeLike(_id, userEmail);

    if (result && result.success) {
      toast.success('Recipe liked successfully!');
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);

      if (result?.isAlreadyLiked) {
        toast.error('You have already liked this recipe!');
      } else {
        toast.error(result?.message || 'Something went wrong.');
      }
    }

    setIsLiking(false);
  };

  return (
    <div>
      <motion.button
        onClick={handleLike}
        disabled={isLiking}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center cursor-pointer gap-2 px-5 py-3 rounded-xl text-white transition-colors duration-300 ${
          hasLiked ? 'bg-red-500' : 'bg-orange-500'
        } disabled:opacity-50`}
      >
        <Heart
          size={18}
          className={`${isLiking ? 'animate-pulse' : ''} ${hasLiked ? 'fill-white' : ''}`}
        />
        {hasLiked ? `Liked (${likes})` : `Like (${likes})`}
      </motion.button>
    </div>
  );
};

export default LikeButtton;
