import { getFeaturedData } from '@/db/recipedata';
import React from 'react';
import FeaturedGrid from './FeaturedGrid';

const FeatiredSection = async () => {
  const featuredData = (await getFeaturedData()) || [];

  return (
    <div>
      <FeaturedGrid featuredData={featuredData} />
    </div>
  );
};

export default FeatiredSection;
