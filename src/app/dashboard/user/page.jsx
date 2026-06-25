import { MyRecipeApi } from '@/db/recipedata';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হলো
import { BookOpen, Heart, ThumbsUp } from 'lucide-react';

const UserDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  // ইমেল পাস করে ডাটা আনা হচ্ছে (আগের স্টেপ অনুযায়ী)
  const myRecipes = (await MyRecipeApi(session.user.email)) || [];

  return (
    <div className="bg-[#0a0504] text-white min-h-screen p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-3xl font-serif text-[#ebd6c8] tracking-wide font-normal">
            Welcome back, Chef {session.user.name.split(' ')[0]}
          </h1>
          <p className="text-zinc-500 text-sm tracking-wide">
            Here's what's happening in your kitchen today.
          </p>
        </div>

        {/* 3-Column Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: TOTAL RECIPES */}
          <div className="bg-[#131111] border border-zinc-900/60 p-6 rounded-2xl flex flex-col justify-between h-[180px] shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              {/* Icon Container */}
              <div className="bg-[#241c1a] border border-orange-950/30 p-2.5 rounded-xl text-[#c58265]">
                <BookOpen size={20} />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Total Recipes
              </h2>
              <p className="text-4xl font-semibold font-mono tracking-tight text-zinc-100">
                {myRecipes.length}
              </p>
            </div>
          </div>

          {/* Card 2: TOTAL FAVORITES */}
          <div className="bg-[#131111] border border-zinc-900/60 p-6 rounded-2xl flex flex-col justify-between h-[180px] shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="bg-[#1b2318]   p-2.5 rounded-xl text-[#6dbb30]">
                <Heart size={20} fill="currentColor" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Total Favorites
              </h2>
              <p className="text-4xl font-semibold font-mono tracking-tight text-zinc-100">
                1.2k
              </p>
            </div>
          </div>

          {/* Card 3: LIKES RECEIVED */}
          <div className="bg-[#131111] border border-zinc-900/60 p-6 rounded-2xl flex flex-col justify-between h-[180px] shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className="bg-[#162229] p-2.5 rounded-xl text-[#3ca2d3]">
                <ThumbsUp size={20} fill="currentColor" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Likes Received
              </h2>
              <p className="text-4xl font-semibold font-mono tracking-tight text-zinc-100">
                8.4k
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
