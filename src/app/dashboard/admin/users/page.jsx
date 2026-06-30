export const dynamic = 'force-dynamic';

import { getAllUsers } from '@/db/admindata';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ManageUsersClient from '@/components/admindashboard/ManageUsersClient';

const ManageUsersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  const users = await getAllUsers();

  return (
    <div className="text-white min-h-screen">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-serif text-[#ebd6c8] tracking-wide font-normal">
          Manage Users
        </h1>
        <p className="text-zinc-500 text-sm">
          View, block, and unblock users from the platform.
        </p>
      </div>
      <ManageUsersClient initialUsers={users} />
    </div>
  );
};

export default ManageUsersPage;
