'use client';

import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { updateRecipeFavorite } from '@/db/recipedata';
import { toast } from 'react-toastify';

const FavariteButton = ({ recipe, userEmail }) => {
  const { _id, favoritedBy = [] } = recipe || {};

  const [isFavorited, setIsFavorited] = useState(
    favoritedBy.includes(userEmail),
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async () => {
    if (isLoading || !_id) return;

    if (!userEmail) {
      toast.error('Please login to add to favorites');
      return;
    }

    setIsLoading(true);

    setIsLoading(true);

    setIsFavorited(!isFavorited);

    const result = await updateRecipeFavorite(_id, userEmail);

    if (result && result.success) {
      setIsFavorited(result.isFavorited);
      toast.success(result.message);
    } else {
      setIsFavorited(isFavorited);
      toast.error('Something went wrong');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <motion.button
        onClick={handleFavorite}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center cursor-pointer gap-2 px-5 py-3 rounded-xl text-white transition-colors duration-300 ${
          isFavorited ? 'bg-yellow-600' : 'bg-zinc-700 hover:bg-zinc-600'
        } disabled:opacity-50`}
      >
        <Bookmark size={18} className={isFavorited ? 'fill-white' : ''} />
        {isFavorited ? 'Favorited' : 'Favorite'}
      </motion.button>
    </div>
  );
};

export default FavariteButton;
