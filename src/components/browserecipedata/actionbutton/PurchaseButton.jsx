'use client';

import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

const PurchaseButton = ({ purchrecipe, userEmail }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!userEmail) {
      toast.error('Please login to purchase this recipe!');
      return;
    }

    setIsLoading(true);

    const paymentPayload = {
      recipeId: purchrecipe?._id,
      recipeName: purchrecipe?.recipeName,
      recipeImage: purchrecipe?.recipeImage,
      price: parseFloat(purchrecipe?.price) || 4.99,
      userEmail: userEmail,
    };
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      const res = await fetch(`${baseUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentPayload),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const session = await res.json();
      console.log('Direct Express Response:', session);

      if (session && session.url) {
        window.location.href = session.url;
      } else {
        toast.error('Invalid response structure from backend.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Failed to connect to express backend server.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <motion.button
        onClick={handlePurchase}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer gap-2 bg-green-500 hover:bg-green-600 transition-colors px-5 py-3 rounded-xl text-white disabled:opacity-50"
      >
        <DollarSign size={18} />
        {isLoading ? 'Processing...' : 'Purchase'}
      </motion.button>
    </div>
  );
};

export default PurchaseButton;
