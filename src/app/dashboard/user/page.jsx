import { MyRecipeApi } from '@/db/recipedata';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const UserDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const myRecipes = await MyRecipeApi();

  return (
    <div className="bg-[#0c0604] text-white min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">
        Welcome to your Dashboard, {session.user.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-orange-600/90 p-6 rounded-xl border border-orange-500/20 shadow-lg">
          <h2 className="text-sm uppercase tracking-wider text-orange-200 font-semibold mb-1">
            My Recipes
          </h2>
          {/* এখন নিখুঁতভাবে শুধুমাত্র এই ইউজারের তৈরি করা রেসিপির সংখ্যা দেখাবে */}
          <p className="text-4xl font-bold font-serif">{myRecipes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
