'use client';

import { ArrowRight, Package, MapPin, ShieldCheck, Truck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return <main className="mx-auto max-w-7xl px-5 lg:px-10">
    <section className="grid items-center gap-10 pb-14 pt-8 lg:grid-cols-[1.05fr_.95fr] lg:pt-14">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lime/60 px-4 py-2 text-sm font-bold text-leaf"><Zap size={15}/> Kampala parcel delivery</div>
        <h1 className="max-w-xl text-5xl font-black leading-[.98] tracking-[-.05em] sm:text-7xl">Send parcels.<br/><span className="text-leaf">Track every delivery.</span></h1>
        <p className="mt-6 max-w-md text-lg leading-7 text-slate-500">Fast, reliable pickup and delivery for documents, packages and parcels across Kampala.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/courier" className="btn-primary">Send a parcel <ArrowRight className="ml-2 inline" size={17}/></Link>
          <Link href="/tracking/QD-C4821" className="rounded-2xl border border-black/10 bg-white px-5 py-3 font-bold">Track a parcel</Link>
        </div>
      </div>
      <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-[#dcead8] p-5 shadow-inner">
        <div className="absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(35deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%),linear-gradient(125deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%)',backgroundSize:'100px 100px'}}/>
        <div className="relative flex justify-between text-xs font-bold text-leaf"><span className="rounded-full bg-white/80 px-3 py-2">LIVE DELIVERY NETWORK</span><span className="rounded-full bg-lime px-3 py-2">Parcel tracking</span></div>
        <div className="absolute left-[33%] top-[32%] rounded-full bg-leaf p-3 text-white shadow-lg"><Truck size={20}/></div>
        <div className="absolute right-[25%] top-[58%] rounded-full bg-orange-500 p-3 text-white shadow-lg"><MapPin size={20}/></div>
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/90 p-4"><div><p className="text-xs text-slate-500">Service area</p><p className="font-bold">Kampala & surrounding areas</p></div><span className="pill bg-lime text-leaf">Fast pickup</span></div>
      </div>
    </section>
    <section className="grid gap-4 md:grid-cols-3">
      <Feature icon={<Package/>} title="Easy parcel booking" text="Enter pickup, receiver and parcel details in minutes."/>
      <Feature icon={<Truck/>} title="Reliable pickup" text="A delivery rider collects your parcel and keeps it moving."/>
      <Feature icon={<ShieldCheck/>} title="Track your parcel" text="Follow delivery status from pickup to successful handover."/>
    </section>
    <section className="card mt-8 p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div><h2 className="text-2xl font-black">Need to send a parcel?</h2><p className="mt-1 text-slate-500">Get an instant delivery estimate based on distance.</p><Link href="/courier" className="btn-primary mt-6 inline-flex">Create delivery <ArrowRight className="ml-2" size={17}/></Link></div>
        <div className="rounded-3xl bg-[#eff8e3] p-6"><p className="text-sm font-bold text-leaf">STARTING PRICE</p><p className="mt-2 text-5xl font-black">UGX 4,000</p><p className="mt-2 text-sm text-slate-500">UGX 3,000 base + UGX 1,000 per km</p></div>
      </div>
    </section>
  </main>;
}
function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="card p-6"><div className="text-leaf">{icon}</div><h2 className="mt-5 font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>}
