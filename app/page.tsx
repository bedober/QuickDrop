import { ArrowRight, Bike, Clock3, MapPin, Package, Search, ShoppingBag, Star, Utensils, Zap } from 'lucide-react';
import Link from 'next/link';
'use client';
import { useState } from 'react';
import { restaurants, riders } from '@/app/lib/mock-data';

export default function Home() {
  const [tab, setTab] = useState<'Food' | 'Courier' | 'Ride'>('Food');

  return (
    <main className="mx-auto max-w-7xl px-5 lg:px-10">
      <section className="grid items-center gap-10 pb-14 pt-8 lg:grid-cols-[1.05fr_.95fr] lg:pt-14">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lime/60 px-4 py-2 text-sm font-bold text-leaf">
            <Zap size={15} /> Kampala&apos;s super app
          </div>

          <h1 className="max-w-xl text-5xl font-black leading-[.98] tracking-[-.05em] sm:text-7xl">
            Everything delivered.
            <br />
            <span className="text-leaf">Every ride.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-7 text-slate-500">
            Food, parcels and rides around Kampala — made simple, safe and on time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-primary">
              Get started <ArrowRight className="ml-2 inline" size={17} />
            </button>
            <Link href="/tracking/QD-1048" className="rounded-2xl border border-black/10 bg-white px-5 py-3 font-bold">
              Track an order
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
            <span className="pill bg-white shadow-sm">UGX pricing</span>
            <span className="pill bg-white shadow-sm">Live tracking</span>
            <span className="pill bg-white shadow-sm">MoMo payouts</span>
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-[#dcead8] p-5 shadow-inner">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(35deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%),linear-gradient(125deg,transparent 45%,#fff 46%,#fff 48%,transparent 49%)',
              backgroundSize: '100px 100px',
            }}
          />

          <div className="relative flex justify-between text-xs font-bold text-leaf">
            <span className="rounded-full bg-white/80 px-3 py-2">LIVE IN KAMPALA</span>
            <span className="rounded-full bg-lime px-3 py-2">12 riders nearby</span>
          </div>

          <div className="absolute left-[20%] top-[40%] h-28 w-28 rounded-full border-2 border-white bg-leaf/10" />
          <div className="absolute left-[33%] top-[32%] rounded-full bg-leaf p-3 text-white shadow-lg">
            <Bike size={20} />
          </div>
          <div className="absolute right-[25%] top-[58%] rounded-full bg-orange-500 p-3 text-white shadow-lg">
            <MapPin size={20} />
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/90 p-4 backdrop-blur">
            <div>
              <p className="text-xs text-slate-500">Your area</p>
              <p className="font-bold">Kololo, Kampala</p>
            </div>
            <span className="pill bg-lime text-leaf">~30 min</span>
          </div>
        </div>
      </section>

      <section className="card p-2">
        <div className="grid grid-cols-3 gap-1">
          {(['Food', 'Courier', 'Ride'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-2xl px-3 py-4 text-sm font-black sm:text-base ${
                tab === item ? 'bg-leaf text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item === 'Food' ? '🍽️' : item === 'Courier' ? '📦' : '🏍️'} <span className="ml-1">{item}</span>
            </button>
          ))}
        </div>

        {tab === 'Food' ? <FoodTab /> : tab === 'Courier' ? <CourierTab /> : <RideTab />}
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-2xl bg-lime/60 p-2 text-leaf"><Utensils size={18} /></div>
            <h3 className="text-lg font-black">Food & groceries</h3>
          </div>
          <p className="text-sm text-slate-500">6 restaurant partners, quick checkouts, and cashless payments.</p>
        </div>
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-2xl bg-lime/60 p-2 text-leaf"><Package size={18} /></div>
            <h3 className="text-lg font-black">Courier delivery</h3>
          </div>
          <p className="text-sm text-slate-500">Documents, parcels, and boxes with instant UGX pricing by distance.</p>
        </div>
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-2xl bg-lime/60 p-2 text-leaf"><Bike size={18} /></div>
            <h3 className="text-lg font-black">Ride booking</h3>
          </div>
          <p className="text-sm text-slate-500">Boda, tuk-tuk and mini car rides with live rider updates.</p>
        </div>
      </section>
    </main>
  );
}

function FoodTab() {
  return (
    <div className="p-5 sm:p-8">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">What are you craving?</h2>
          <p className="mt-1 text-sm text-slate-500">Delivered fresh to Kololo</p>
        </div>

        <label className="flex w-full items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-slate-400 sm:w-64">
          <Search size={18} />
          <input className="w-full bg-transparent outline-none" placeholder="Search food..." />
        </label>
      </div>

      <div className="mb-7 flex gap-2 overflow-auto pb-1">
        {['All', '🌯 Local', '🍔 Burgers', '🍕 Pizza', '🥗 Healthy', '☕ Coffee'].map((tag, index) => (
          <span key={tag} className={`pill whitespace-nowrap ${index === 0 ? 'bg-lime text-leaf' : 'bg-slate-50 text-slate-500'}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <article key={restaurant.id} className="group cursor-pointer">
            <div className={`grid h-36 place-items-center rounded-3xl ${restaurant.accent} text-6xl transition group-hover:scale-[1.01]`}>
              {restaurant.emoji}
            </div>
            <div className="pt-3">
              <div className="flex justify-between">
                <h3 className="font-black">{restaurant.name}</h3>
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Star size={14} className="fill-orange-400 text-orange-400" />
                  {restaurant.rating}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {restaurant.cuisine} · {restaurant.eta}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CourierTab() {
  return (
    <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2">
      <div>
        <h2 className="text-2xl font-black">Send anything, anywhere</h2>
        <p className="mt-1 text-slate-500">Fast, dependable courier service across Kampala.</p>

        <div className="mt-6 space-y-3">
          <label className="block text-sm font-bold">
            Pickup location
            <input className="field mt-2" placeholder="e.g. Acacia Mall" />
          </label>

          <label className="block text-sm font-bold">
            Drop-off location
            <input className="field mt-2" placeholder="e.g. Makerere University" />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-bold">
              Parcel type
              <select className="field mt-2">
                <option>Document</option>
                <option>Small box</option>
                <option>Large box</option>
              </select>
            </label>

            <label className="text-sm font-bold">
              Weight
              <select className="field mt-2">
                <option>Up to 2 kg</option>
                <option>2–5 kg</option>
                <option>5–10 kg</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-3xl bg-[#eff8e3] p-6">
        <div>
          <p className="text-sm font-bold text-leaf">INSTANT QUOTE</p>
          <p className="mt-2 text-5xl font-black">UGX 5,000</p>
          <p className="mt-2 text-sm text-slate-500">UGX 3,000 base + UGX 1,000 per km</p>
        </div>

        <div className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between"><span>Estimated distance</span><b>2.0 km</b></div>
          <div className="flex justify-between"><span>ETA</span><b>25–35 min</b></div>
          <Link href="/checkout" className="btn-primary mt-3 flex w-full items-center justify-center">
            Continue to courier booking <ArrowRight className="ml-2 inline" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function RideTab() {
  return (
    <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2">
      <div>
        <h2 className="text-2xl font-black">Move your way</h2>
        <p className="mt-1 text-slate-500">Safe rides with trusted local drivers.</p>

        <div className="mt-6 space-y-3">
          <label className="block text-sm font-bold">
            Where are you?
            <input className="field mt-2" placeholder="Current location" />
          </label>

          <label className="block text-sm font-bold">
            Where to?
            <input className="field mt-2" placeholder="Destination" />
          </label>

          <div className="grid grid-cols-3 gap-2">
            {[
              ['🏍️', 'Boda', 'UGX 4,000'],
              ['🛺', 'Tuk Tuk', 'UGX 7,000'],
              ['🚙', 'Mini Car', 'UGX 10,000'],
            ].map(([emoji, label, price], index) => (
              <button
                key={label}
                className={`rounded-2xl border p-3 text-left ${index === 0 ? 'border-leaf bg-lime/30' : 'border-black/10'}`}
              >
                <span className="text-2xl">{emoji}</span>
                <b className="mt-1 block text-xs">{label}</b>
                <small className="text-slate-500">{price}</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-3xl bg-[#e9f2ef] p-6">
        <div>
          <p className="text-sm font-bold text-leaf">FARE ESTIMATE</p>
          <p className="mt-2 text-5xl font-black">UGX 6,500</p>
          <p className="mt-2 text-sm text-slate-500">4.2 km · 12–18 min away</p>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-lime">🏍️</div>
            <div>
              <b>John K.</b>
              <p className="text-xs text-slate-500">4.9 ★ · Plate UEX 421B</p>
            </div>
            <span className="ml-auto text-xs font-bold text-leaf">2 min</span>
          </div>

          <Link href="/checkout" className="btn-primary flex w-full items-center justify-center">
            Book boda boda
          </Link>
        </div>
      </div>
    </div>
  );
}
