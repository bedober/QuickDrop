'use client';

import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  function signIn() {
    document.cookie = 'quickdrop_role=customer; path=/; max-age=86400; samesite=lax';
    document.cookie = 'userRole=customer; path=/; max-age=86400; samesite=lax';
    const next = new URLSearchParams(window.location.search).get('next');
    router.push(next && next.startsWith('/') && !next.startsWith('//') ? next : '/account');
  }

  return (
    <main className="mx-auto max-w-xl px-5 pb-16 pt-8">
      <div className="card p-6 sm:p-8">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-leaf"><ShieldCheck /></div>
        <h1 className="mt-6 text-3xl font-black">Welcome to QuickDrop UG</h1>
        <p className="mt-2 text-slate-500">Parcel pickup, delivery and tracking for customers.</p>
        <button onClick={signIn} className="btn-primary mt-7 w-full">Continue</button>
      </div>
    </main>
  );
}
