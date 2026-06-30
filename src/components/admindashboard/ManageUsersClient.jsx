'use client';

import { useState } from 'react';
import { Crown, ShieldBan, ShieldCheck, Search, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const ManageUsersClient = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState(null);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleBlock = async (user) => {
    setLoadingId(user._id);
    const newStatus = !user.isBlocked;

    try {
      const res = await fetch(`${baseUrl}/api/admin/users/${user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBlocked: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u2) =>
            u2._id === user._id ? { ...u2, isBlocked: newStatus } : u2
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to update user');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1c1919] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
      </div>

      {/* Stats strip */}
      <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
        <Users size={13} />
        <span>
          Showing <span className="text-zinc-300 font-semibold">{filtered.length}</span> of{' '}
          <span className="text-zinc-300 font-semibold">{users.length}</span> users
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#131111] border border-zinc-900/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  User
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Email
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Role
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Status
                </th>
                <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-zinc-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user, i) => (
                  <tr
                    key={user._id}
                    className={`border-b border-zinc-900/50 hover:bg-zinc-800/20 transition-colors ${
                      i === filtered.length - 1 ? 'border-none' : ''
                    }`}
                  >
                    {/* User Avatar + Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-zinc-200">
                            {user.name || 'Unknown'}
                          </span>
                          {user.isPremium && (
                            <Crown size={12} className="text-yellow-400" />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-sm text-zinc-400">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                            : 'bg-zinc-700/40 text-zinc-400 border border-zinc-700/60'
                        }`}
                      >
                        {user.role || 'user'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          user.isBlocked
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : 'bg-green-500/15 text-green-400 border border-green-500/30'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.isBlocked ? 'bg-red-400' : 'bg-green-400'
                          }`}
                        />
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      {user.role === 'admin' ? (
                        <span className="text-xs text-zinc-600 italic">Protected</span>
                      ) : (
                        <button
                          disabled={loadingId === user._id}
                          onClick={() => handleToggleBlock(user)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                            user.isBlocked
                              ? 'bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/25'
                              : 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25'
                          }`}
                        >
                          {loadingId === user._id ? (
                            <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                          ) : user.isBlocked ? (
                            <ShieldCheck size={13} />
                          ) : (
                            <ShieldBan size={13} />
                          )}
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersClient;
