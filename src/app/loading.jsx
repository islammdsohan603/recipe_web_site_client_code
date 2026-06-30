import { ChefHat } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0604]/80 backdrop-blur-sm text-white min-h-screen">
      <ChefHat size={48} className="text-orange-500 animate-bounce mb-4" />
      <p className="text-orange-200/80 tracking-widest text-sm font-semibold uppercase animate-pulse">
        Fetching Data...
      </p>
    </div>
  );
}
