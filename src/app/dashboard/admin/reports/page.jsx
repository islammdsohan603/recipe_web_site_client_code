export const dynamic = 'force-dynamic';

import { getAllReports } from '@/db/admindata';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AlertTriangle, BookOpen, User, Calendar } from 'lucide-react';

const AdminReportsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  const reports = await getAllReports();

  return (
    <div className="text-white min-h-screen">
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-serif text-[#ebd6c8] tracking-wide font-normal">
          Reports
        </h1>
        <p className="text-zinc-500 text-sm">
          Review all user-submitted reports about recipes.
        </p>
      </div>

      {/* Count */}
      <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
        <AlertTriangle size={13} className="text-red-400" />
        <span>
          <span className="text-zinc-300 font-semibold">{reports.length}</span>{' '}
          total report{reports.length !== 1 ? 's' : ''}
        </span>
      </div>

      {reports.length === 0 ? (
        <div className="bg-[#131111] border border-zinc-900/60 rounded-2xl p-12 text-center">
          <AlertTriangle size={32} className="text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500">No reports submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-[#131111] border border-zinc-900/60 rounded-2xl p-5 hover:border-red-500/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Left: Recipe & Reason */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                      <AlertTriangle size={10} />
                      {report.reason}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen size={14} className="text-orange-400 shrink-0" />
                    <span className="text-zinc-200 font-medium">
                      {report.recipeName || 'Unknown Recipe'}
                    </span>
                  </div>

                  {report.details && (
                    <p className="text-sm text-zinc-500 pl-5 border-l border-zinc-800 leading-relaxed">
                      {report.details}
                    </p>
                  )}
                </div>

                {/* Right: Meta */}
                <div className="flex flex-col gap-1.5 text-xs text-zinc-600 shrink-0 sm:text-right">
                  <div className="flex items-center gap-1 sm:justify-end">
                    <User size={11} />
                    <span>{report.userEmail || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:justify-end">
                    <Calendar size={11} />
                    <span>
                      {report.createdAt
                        ? new Date(report.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReportsPage;
