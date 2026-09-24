import { ChevronRight, Package, Wallet } from 'lucide-react';
import { transactions } from '@/app/lib/mock-data';

export default function Account() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-16">
      <div className="mb-8">
        <p className="text-sm font-bold text-leaf">CUSTOMER ACCOUNT</p>
        <h1 className="mt-1 text-4xl font-black">Hello, Alex 👋</h1>
        <p className="mt-2 text-slate-500">Manage your QuickDrop experience.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="card bg-leaf p-5 text-white">
          <Wallet />
          <p className="mt-6 text-sm text-white/70">Wallet balance</p>
          <h2 className="mt-1 text-2xl font-black">UGX 84,500</h2>
          <button className="mt-4 rounded-xl bg-lime px-3 py-2 text-sm font-bold text-leaf">Add money</button>
        </div>

        {[
          ['📦', 'Orders & rides', '12 completed'],
          ['📍', 'Saved addresses', 'Home · Work'],
          ['❤️', 'Favorites', '8 places'],
        ].map(([emoji, label, detail]) => (
          <div className="card p-5" key={label}>
            <span className="text-2xl">{emoji}</span>
            <h3 className="mt-5 font-black">{label}</h3>
            <p className="mt-1 text-sm text-slate-500">{detail}</p>
            <ChevronRight className="mt-5 text-slate-400" size={18} />
          </div>
        ))}
      </div>

      <div className="card mt-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Recent activity</h2>
          <span className="text-sm font-bold text-leaf">See all</span>
        </div>

        {transactions.map((entry) => (
          <div className="flex items-center gap-4 border-b border-black/5 py-5 last:border-0" key={entry.id}>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-lime/50">
              <Package size={19} />
            </div>

            <div className="flex-1">
              <b>{entry.title}</b>
              <p className="mt-1 text-xs text-slate-500">{entry.id} · {entry.time}</p>
            </div>

            <b>{entry.amount}</b>
          </div>
        ))}
      </div>
    </main>
  );
}
