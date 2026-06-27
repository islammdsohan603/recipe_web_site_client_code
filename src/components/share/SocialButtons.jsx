'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { FaGoogle } from 'react-icons/fa';

const SocialButtons = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={loading}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white py-3 font-semibold text-gray-800 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-orange-500" />
          <span>Signing In...</span>
        </>
      ) : (
        <>
          <FaGoogle className="text-xl text-red-500" />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
};

export default SocialButtons;
