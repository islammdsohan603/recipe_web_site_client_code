export const dynamic = 'force-dynamic';

import { getAdminStats } from '@/db/admindata';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Users, BookOpen, Crown, AlertTriangle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const AdminDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  const stats = await getAdminStats();

  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      href: '/dashboard/admin/users',
    },
    {
      label: 'Total Recipes',
      value: stats.totalRecipes,
      icon: BookOpen,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      href: '/dashboard/admin/manage-recipes',
    },
    {
      label: 'Premium Members',
      value: stats.totalPremiumMembers,
      icon: Crown,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      href: '/dashboard/admin/users',
    },
    {
      label: 'Total Reports',
      value: stats.totalReports,
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      href: '/dashboard/admin/reports',
    },
  ];

  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <div className="mb-8 space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-widest uppercase">
            Admin Panel
          </span>
        </div>
        <h1 className="text-3xl font-serif text-[#ebd6c8] tracking-wide font-normal mt-2">
          Welcome back, {session.user.name}
        </h1>
        <p className="text-zinc-500 text-sm tracking-wide">
          Here's a complete overview of your RecipeHub platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link href={card.href} key={card.label}>
              <div className={`bg-[#131111] border ${card.border} p-6 rounded-2xl flex flex-col justify-between h-[160px] shadow-xl hover:scale-[1.02] transition-transform duration-200 cursor-pointer group`}>
                <div className="flex justify-between items-start">
                  <div className={`${card.bg} border ${card.border} p-2.5 rounded-xl ${card.color}`}>
                    <Icon size={20} />
                  </div>
                  <TrendingUp size={14} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                    {card.label}
                  </h2>
                  <p className="text-4xl font-semibold font-mono tracking-tight text-zinc-100">
                    {card.value}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#131111] border border-zinc-900/60 rounded-2xl p-6">
        <h2 className="text-lg font-serif text-[#ebd6c8] mb-5 flex items-center gap-2">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard/admin/users"
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-[#1c1919] hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-200 group">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <Users size={18} />
            </div>
            <div>
              <p className="font-semibold text-zinc-200 text-sm">Manage Users</p>
              <p className="text-xs text-zinc-500">Block, unblock & view all users</p>
            </div>
          </Link>

          <Link href="/dashboard/admin/manage-recipes"
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-[#1c1919] hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-200 group">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="font-semibold text-zinc-200 text-sm">Manage Recipes</p>
              <p className="text-xs text-zinc-500">Edit, delete & feature recipes</p>
            </div>
          </Link>

          <Link href="/dashboard/admin/reports"
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-[#1c1919] hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-200 group">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition-colors">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="font-semibold text-zinc-200 text-sm">View Reports</p>
              <p className="text-xs text-zinc-500">Review reported content</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
