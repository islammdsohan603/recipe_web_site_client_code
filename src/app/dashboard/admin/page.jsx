import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const AdminDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="bg-[#0c0604] text-white min-h-screen p-8">
      <h1 className="text-2xl font-bold">
        Welcome to Admin Dashboard, {session.user.name}
      </h1>
    </div>
  );
};

export default AdminDashboard;
