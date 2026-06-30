import Link from 'next/link';
import { ChefHat, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#0c0604] text-white px-6">
      <div className="relative mb-8">
        <ChefHat size={120} className="text-orange-500/20" />
        <ChefHat size={80} className="text-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12" />
        <div className="absolute -bottom-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg transform rotate-12">
          404
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-serif text-[#ebd6c8] mb-4 text-center">
        Recipe Not Found
      </h1>
      
      <p className="text-zinc-400 text-center max-w-md mb-8 leading-relaxed">
        Oops! It looks like this recipe burned in the oven. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        href="/"
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20"
      >
        <Home size={18} />
        Back to Home Kitchen
      </Link>
    </div>
  );
}
