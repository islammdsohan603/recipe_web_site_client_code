import RecipeDetailsCard from '@/components/browserecipedata/RecipeDetailsCard';
import { getDetailsRecipeData } from '@/db/recipedata';
import React from 'react';

const DetailsRecipe = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const recipedetails = await getDetailsRecipeData(id);

  return (
    <div className=" text-white">
      <RecipeDetailsCard recipedetails={recipedetails} />
    </div>
  );
};

export default DetailsRecipe;
