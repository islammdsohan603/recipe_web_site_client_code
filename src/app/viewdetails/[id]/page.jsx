import MyRecipeDetailsCard from '@/components/myrecipesdata/MyRecipeDetailsCard';
import { getViewRecipeData } from '@/db/recipedata';
import React from 'react';

const ViewDetailsPage = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const viewData = await getViewRecipeData(id);

  return (
    <div>
      <MyRecipeDetailsCard viewData={viewData} />
    </div>
  );
};

export default ViewDetailsPage;
