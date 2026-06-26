

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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

export const getAllRecipeData = async (category = '', page = 1) => {
  try {
    const res = await fetch(`${baseUrl}/api/all-recipe?category=${category}&page=${page}`, {
      cache: 'no-store'
    })

    if (!res.ok) throw new Error("Failed to fetch recipes")

    return await res.json()

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { recipes: [], totalPages: 1 };
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

// get new all recipe data

export const createNewRecipeData = async () => {
  try {
    try {
      const res = await fetch(`${baseUrl}/api/new-recipe`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await res.json();
      return result;
    } catch (error) {
      console.log(error)
    }
  } catch (error) {

  }
}

// get view recipe data

export const getViewRecipeData = async (id) => {
  try {

    const res = await fetch(`${baseUrl}/api/view-details/${id}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error("Failed to fetch recipe details");
    }

    const result = await res.json()
    return result


  } catch (error) {
    console.error("Error in getDetailsRecipeData:", error);
    return null;
  }

}


// update like count api call

export const updateRecipeLike = async (id, email) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipe/like/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email })
    })


    return await res.json()

  } catch (error) {
    console.log("Error updating like count", error);
  }
}


// my recipe api call
export const MyRecipeApi = async (email) => {
  try {

    const res = await fetch(`${baseUrl}/api/my-recipe?email=${encodeURIComponent(email)}`, {
      cache: 'no-store'
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.log("Error fetching my recipes:", error);
    return [];
  }
}


// like count api dashboard


export const getUserLikedCount = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/user-liked-count?email=${email}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch liked count");

    const data = await res.json();

    return data.count || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

// favorites api

export const getUserFavorites = async (email) => {
  try {
    const res = await fetch(`${baseUrl}/api/user-favorites?email=${email}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch favorites");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// single favorites api call

export const updateRecipeFavorite = async (id, email) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipe/favorite/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await res.json();
  } catch (error) {
    console.log("Error updating favorite status", error);
  }
};




