'use client';

import { signIn } from 'next-auth/react';
import { Chrome, Facebook, Music2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const callbackUrl =
    new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('next') || '/account';

  return (
    <main className="mx-auto max-w-xl px-5 pb-16 pt-8">
      <div className="card p-6 sm:p-8">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-leaf">
          <ShieldCheck />
        </div>
        <h1 className="mt-6 text-3xl font-black">Welcome to QuickDrop UG</h1>
        <p className="mt-2 text-slate-500">Sign in to book parcels, manage deliveries and track orders.</p>

        <div className="mt-7 grid gap-3">
          <button onClick={() => signIn('google', { callbackUrl })} className="btn-primary flex w-full items-center justify-center gap-3">
            <Chrome size={20} /> Continue with Google
          </button>
          <button onClick={() => signIn('facebook', { callbackUrl })} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800">
            <Facebook size={20} /> Continue with Facebook
          </button>
          <button onClick={() => signIn('tiktok', { callbackUrl })} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800">
            <Music2 size={20} /> Continue with TikTok
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Choose a social account to authenticate your QuickDrop customer account.
        </p>
      </div>
    </main>
  );
}
