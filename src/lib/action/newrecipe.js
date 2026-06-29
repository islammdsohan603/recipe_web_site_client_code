"use server"

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export const createNewRecipe = async (newrecipe) => {
  if (!baseUrl) {
    throw new Error("Base URL is not defined. Please check your environment variables.");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    throw new Error("You must be logged in to add a recipe.");
  }

  const res = await fetch(`${baseUrl}/api/recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newrecipe,
      email: session.user.email,
    }),
  });

  return res.json();
}


// recports api


export const reportRecipeApi = async (reportData) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipe/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData)
    });
    return await res.json();
  } catch (error) {
    console.log("Error submitting report:", error);
    return { success: false, message: "Failed to connect to server" };
  }
};







