
const baseUrl = process.env.NEXT_PULIC_SERVER_URL;

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