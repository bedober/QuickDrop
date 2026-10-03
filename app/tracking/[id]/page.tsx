import { ArrowLeft, Check, MessageCircle, Phone, ShieldAlert, Truck, Package } from 'lucide-react';
import Link from 'next/link';

export default function Tracking({params}:{params:{id:string}}){
  return <main className="mx-auto max-w-5xl px-5 pb-16">
    <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500"><ArrowLeft size={16}/> Back home</Link>
    <div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-bold text-leaf">PARCEL {params.id}</p><h1 className="mt-1 text-4xl font-black">Your parcel is on the way</h1></div><span className="pill bg-lime text-leaf">Out for delivery</span></div>
    <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#dcead8] p-5" style={{backgroundImage:'linear-gradient(35deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%),linear-gradient(125deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%)',backgroundSize:'90px 90px'}}>
        <div className="absolute left-[35%] top-[32%] rounded-full bg-leaf p-4 text-white shadow-lg"><Truck/></div>
        <div className="absolute bottom-[23%] right-[20%] rounded-full bg-orange-500 p-3 text-white"><Package/></div>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4"><p className="text-xs text-slate-500">Latest update</p><p className="font-bold">Delivery rider is heading to the receiver</p></div>
      </div>
      <div className="space-y-5">
        <div className="card p-5"><h3 className="mb-5 font-black">Parcel status</h3>{['Order created','Rider assigned','Parcel picked up','Out for delivery','Delivered'].map((x,i)=><div className="flex gap-3 pb-5 last:pb-0" key={x}><div className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${i<4?'bg-leaf text-white':'bg-slate-100 text-slate-400'}`}>{i<4?<Check size={14}/>:<span className="h-2 w-2 rounded-full bg-slate-300"/>}</div><div><p className={`text-sm font-bold ${i<4?'':'text-slate-400'}`}>{x}</p>{i===3&&<p className="text-xs text-slate-500">Updated just now</p>}</div></div>)}</div>
        <div className="card p-5"><div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-full bg-lime">🚚</div><div><h2 className="font-black">Delivery rider</h2><p className="text-sm text-slate-500">John K. · Available for contact</p></div><div className="ml-auto flex gap-2"><button className="rounded-full bg-lime p-3 text-leaf"><Phone size={17}/></button><button className="rounded-full bg-slate-100 p-3"><MessageCircle size={17}/></button></div></div></div>
        <div className="flex gap-3"><button className="flex-1 rounded-2xl border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600"><ShieldAlert className="mr-2 inline" size={16}/> Report issue</button></div>
      </div>
    </div>
  </main>
}