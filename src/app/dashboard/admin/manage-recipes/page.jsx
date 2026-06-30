export const dynamic = 'force-dynamic';

import { getAllAdminRecipes } from '@/db/admindata';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ManageRecipesClient from '@/components/admindashboard/ManageRecipesClient';

const ManageRecipesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  const recipes = await getAllAdminRecipes();

  return (
    <div className="text-white min-h-screen">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-serif text-[#ebd6c8] tracking-wide font-normal">
          Manage Recipes
        </h1>
        <p className="text-zinc-500 text-sm">
          Edit, delete, and feature recipes from all users.
        </p>
      </div>
      <ManageRecipesClient initialRecipes={recipes} />
    </div>
  );
};

export default ManageRecipesPage;
