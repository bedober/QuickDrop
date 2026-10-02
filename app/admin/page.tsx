'use client';

import AdminGuard from '@/app/components/AdminGuard';
import { BarChart3, Bike, DollarSign, LogOut, Map, MoreHorizontal, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const metrics = [
  { label: 'Revenue today', value: 'UGX 4,820,500', trend: '+12.4%' },
  { label: 'Total orders', value: '248', trend: '+8.2%' },
  { label: 'Active riders', value: '42', trend: 'Live now' },
  { label: 'Commission earned', value: 'UGX 964,100', trend: '20% avg' },
];

const recentOrders = [
  { id: 'QD-1048', user: 'John Doe', type: 'Ride', amount: 'UGX 6,500', status: 'Completed' },
  { id: 'QD-1047', user: 'Jane Smith', type: 'Food', amount: 'UGX 28,000', status: 'In Transit' },
  { id: 'QD-1046', user: 'Mike Johnson', type: 'Courier', amount: 'UGX 5,000', status: 'Pending' },
  { id: 'QD-1045', user: 'Sarah Wilson', type: 'Ride', amount: 'UGX 8,200', status: 'Completed' },
];

const activeRiders = [
  { id: 1, name: 'John K.', vehicle: 'Boda boda', trips: 12, rating: 4.9 },
  { id: 2, name: 'Derrick N.', vehicle: 'Tuk tuk', trips: 8, rating: 4.8 },
  { id: 3, name: 'Aisha M.', vehicle: 'Mini car', trips: 15, rating: 4.7 },
];

export default function AdminPage() {
  return (
    <AdminGuard>
      <Admin />
    </AdminGuard>
  );
}

function Admin() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = `authToken=; path=/; max-age=0`;
    document.cookie = `userRole=; path=/; max-age=0`;
    router.push('/login');
  };

  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-slate-600">Manage orders, riders, and performance metrics</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-2xl border border-[#e3ddd5] bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:border-red-300 hover:text-red-700"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {metric.label}
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-2xl font-black text-slate-900">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-600">{metric.trend}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eafaf2] text-[#0d9b64]">
                {idx === 0 && <DollarSign size={18} />}
                {idx === 1 && <BarChart3 size={18} />}
                {idx === 2 && <Bike size={18} />}
                {idx === 3 && <Users size={18} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <DataTable title="Recent Orders" rows={recentOrders} />
        <DataTable
          title="Active Riders"
          rows={activeRiders.map(r => ({ ...r, trips: String(r.trips), rating: String(r.rating) }))}
        />
      </div>
    </main>
  );
}

function DataTable({
  title,
  rows,
}: {
  title: string;
  rows: (Record<string, string | number> | any)[];
}) {
  if (!rows || rows.length === 0) return null;

  const columns = Object.keys(rows[0]);

  return (
    <div className="card p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-900">{title}</h2>
        <button className="p-2 hover:bg-[#f9f7f4] rounded-lg transition">
          <MoreHorizontal size={18} className="text-slate-400" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#ece6df]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left font-bold text-slate-700 uppercase tracking-[0.08em] text-xs"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-[#f2ede5] hover:bg-[#faf8f6] transition">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-4 text-slate-700">
                    {col === 'status' ? (
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          row[col] === 'Completed'
                            ? 'bg-[#eafaf2] text-[#0b7d52]'
                            : row[col] === 'In Transit'
                              ? 'bg-[#fef3c7] text-[#92400e]'
                              : 'bg-[#fee2e2] text-[#991b1b]'
                        }`}
                      >
                        {row[col]}
                      </span>
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
