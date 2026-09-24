import { Bike, CircleDollarSign, Map, PackageCheck } from 'lucide-react';

const jobs = [
  ['Food delivery', 'Kampala Bowl Co. → Kololo', 'UGX 8,500', '2.4 km'],
  ['Ride request', 'Ntinda → Acacia Mall', 'UGX 7,000', '4.1 km'],
  ['Courier', 'Bugolobi → Makerere', 'UGX 6,000', '3.2 km'],
];

export default function Rider() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-sm font-bold text-leaf">RIDER APP</p>
          <h1 className="mt-1 text-4xl font-black">Good morning, John</h1>
          <p className="mt-2 text-slate-500">Ready to make today count?</p>
        </div>

        <button className="flex items-center gap-3 rounded-2xl bg-leaf px-5 py-3 font-bold text-white">
          <span className="h-3 w-3 rounded-full bg-lime" /> Online <span className="text-white/50">⌄</span>
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <CircleDollarSign className="text-leaf" />
          <p className="mt-5 text-sm text-slate-500">Today&apos;s earnings</p>
          <h2 className="text-2xl font-black">UGX 96,500</h2>
          <p className="mt-1 text-xs font-bold text-green-600">↑ 18% vs yesterday</p>
        </div>

        <div className="card p-5">
          <PackageCheck className="text-leaf" />
          <p className="mt-5 text-sm text-slate-500">Completed trips</p>
          <h2 className="text-2xl font-black">18</h2>
          <p className="mt-1 text-xs text-slate-500">12 deliveries · 6 rides</p>
        </div>

        <div className="card p-5">
          <Bike className="text-leaf" />
          <p className="mt-5 text-sm text-slate-500">Rating</p>
          <h2 className="text-2xl font-black">4.9 <span className="text-base text-orange-400">★</span></h2>
          <p className="mt-1 text-xs text-slate-500">240 completed trips</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black">Incoming requests</h2>
            <span className="pill bg-orange-100 text-orange-700">3 new</span>
          </div>

          <div className="space-y-3">
            {jobs.map(([type, route, value, distance]) => (
              <div className="card flex flex-wrap items-center gap-4 p-4" key={type}>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-lime/50">{type === 'Ride request' ? '🏍️' : '📦'}</div>

                <div className="min-w-[150px] flex-1">
                  <b>{type}</b>
                  <p className="mt-1 text-xs text-slate-500">{route}</p>
                </div>

                <div className="text-right">
                  <b>{value}</b>
                  <p className="text-xs text-slate-500">{distance}</p>
                </div>

                <button className="rounded-xl bg-leaf px-4 py-2 text-sm font-bold text-white">Accept</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card min-h-[300px] overflow-hidden bg-[#dcead8] p-5" style={{backgroundImage:'linear-gradient(35deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%)', backgroundSize:'90px 90px'}}>
          <div className="flex justify-between">
            <h2 className="font-black">Your live zone</h2>
            <Map size={19} />
          </div>

          <div className="mt-28 rounded-2xl bg-white/90 p-4">
            <p className="text-xs text-slate-500">Current area</p>
            <p className="font-bold">Kisementi, Kampala</p>
          </div>
        </div>
      </div>
    </main>
  );
}
