import { BarChart3, Bike, DollarSign, Map, MoreHorizontal, Users } from 'lucide-react';
import { adminMetrics } from '@/app/lib/mock-data';

export default function Admin() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-sm font-bold text-leaf">ADMIN CONSOLE · RESTRICTED</p>
          <h1 className="mt-1 text-4xl font-black">Operations overview</h1>
          <p className="mt-2 text-slate-500">Thursday, 24 September · Kampala service area</p>
        </div>

        <button className="btn-primary">+ Create promo code</button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminMetrics.map((metric) => (
          <div className="card p-5" key={metric.label}>
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <span className="rounded-xl bg-lime/60 p-2 text-leaf">
                {metric.label.includes('Revenue') ? <DollarSign size={17} /> : metric.label.includes('orders') ? <BarChart3 size={17} /> : metric.label.includes('riders') ? <Bike size={17} /> : <Users size={17} /> }
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-black">{metric.value}</h2>
            <p className="mt-1 text-xs font-bold text-green-600">{metric.trend}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <h2 className="font-black">Live rider map</h2>
            <button className="text-sm font-bold text-leaf">View full map</button>
          </div>

          <div className="grid min-h-[300px] place-items-center bg-[#dcead8]" style={{backgroundImage:'linear-gradient(35deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%),linear-gradient(125deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%)', backgroundSize:'90px 90px'}}>
            <div className="rounded-2xl bg-white/90 p-5 text-center shadow">
              <Map className="mx-auto text-leaf" />
              <p className="mt-2 font-bold">42 riders online</p>
              <p className="text-xs text-slate-500">Across 8 Kampala zones</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-black">Needs attention</h2>
            <MoreHorizontal />
          </div>

          {[
            ['Document review', '3 rider applications', 'bg-orange-100'],
            ['Open complaints', '5 unresolved cases', 'bg-red-100'],
            ['Payout queue', 'UGX 1,240,000', 'bg-lime/60'],
          ].map(([label, detail, color]) => (
            <div className="mt-5 flex items-center gap-3" key={label}>
              <div className={`h-3 w-3 rounded-full ${color}`} />
              <div>
                <b className="text-sm">{label}</b>
                <p className="text-xs text-slate-500">{detail}</p>
              </div>
              <span className="ml-auto">›</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {['Users', 'Riders & documents', 'Restaurants', 'Orders & rides'].map((item) => (
          <button className="card flex items-center justify-between p-5 text-left font-bold hover:border-leaf" key={item}>
            {item}<span>→</span>
          </button>
        ))}
      </div>
    </main>
  );
}
