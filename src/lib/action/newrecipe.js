"use server"


const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const createNewRecipe = async (newrecipe) => {
  if (!baseUrl) {
    throw new Error("Base URL is not defined. Please check your environment variables.");
  }

  const res = await fetch(`${baseUrl}/api/recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newrecipe)
  });

  return res.json();
}