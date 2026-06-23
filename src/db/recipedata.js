

const baseUrl = process.env.NEXT_PULIC_SERVER_URL;

// get Pupular api

export const getPopularData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/popular-recipe`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log('Error fetching popular recipes:', error);
    return [];
  }
};

// get Featured api

export const getFeaturedData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/featured-recipe`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}


//get all and fillter recipe api

export const getAllRecipeData = async (category = '') => {
  try {
    const res = await fetch(`${baseUrl}/api/all-recipe?category=${category}`, {
      cache: 'no-store'
    })

    if (!res.ok) throw new Error("Failed to fetch recipes")

    return await res.json()

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

// get single data for details page
export const getDetailsRecipeData = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/details/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error("Failed to fetch recipe details");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error in getDetailsRecipeData:", error);
    return null;
  }
};

