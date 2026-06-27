import AdminPage from '@/components/admindashboard/AdminPage';

export const AdminDashboard = async () => {
  return (
    <div className="bg-[#0c0604] text-white min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Welcome, Admin</h1>

      <div>
        <AdminPage />
      </div>
    </div>
  );
};
