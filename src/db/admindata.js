import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return token ? { 'Cookie': `token=${token}` } : {};
};

// Admin Stats
export const getAdminStats = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/stats`, { 
      cache: 'no-store',
      headers: await getAuthHeaders() 
    });
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return await res.json();
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return { totalUsers: 0, totalRecipes: 0, totalPremiumMembers: 0, totalReports: 0 };
  }
};

// Admin Get All Users
export const getAllUsers = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/users`, { 
      cache: 'no-store',
      headers: await getAuthHeaders() 
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Admin Get All Recipes
export const getAllAdminRecipes = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/recipes`, { 
      cache: 'no-store',
      headers: await getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return await res.json();
  } catch (error) {
    console.error('Error fetching admin recipes:', error);
    return [];
  }
};

// Admin Get All Reports
export const getAllReports = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/reports`, { 
      cache: 'no-store',
      headers: await getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch reports');
    return await res.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
};
