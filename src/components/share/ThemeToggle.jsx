'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';

const Toggling = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-6 h-6"></div>;
  }

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <button 
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} 
      className="text-2xl cursor-pointer hover:opacity-80 transition-opacity"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? <CiLight /> : <MdOutlineDarkMode />}
    </button>
  );
};

export default Toggling;
