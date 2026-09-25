'use client';

import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const roles = [
  { key: 'customer', label: 'Customer', description: 'Food, courier, rides and tracking', destination: '/account' },
  { key: 'rider', label: 'Rider', description: 'Accept jobs and manage earnings', destination: '/rider' },
  { key: 'admin', label: 'Admin', description: 'Manage the QuickDrop operation', destination: '/admin' },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<(typeof roles)[number]['key']>('customer');
  const selected = roles.find((item) => item.key === role)!;

  function signIn() {
    document.cookie = `quickdrop_role=${role}; path=/; max-age=86400; samesite=lax`;
    const next = new URLSearchParams(window.location.search).get('next');
    const destination = next && next.startsWith('/') && !next.startsWith('//') ? next : selected.destination;
    router.push(destination);
  }

  return (
    <main className="mx-auto max-w-xl px-5 pb-16 pt-8">
      <div className="card p-6 sm:p-8">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-leaf"><ShieldCheck /></div>
        <h1 className="mt-6 text-3xl font-black">Welcome to QuickDrop UG</h1>
        <p className="mt-2 text-slate-500">Choose the workspace for this demo account.</p>
        <div className="mt-7 space-y-3">
          {roles.map((item) => (
            <button type="button" key={item.key} onClick={() => setRole(item.key)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left ${role === item.key ? 'border-leaf bg-lime/20' : 'border-black/10 bg-white'}`}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf text-sm font-black text-white">{item.label[0]}</span>
              <span className="flex-1"><b>{item.label}</b><small className="mt-1 block text-slate-500">{item.description}</small></span>
              <span className={`h-4 w-4 rounded-full border-4 ${role === item.key ? 'border-leaf' : 'border-slate-200'}`} />
            </button>
          ))}
        </div>
        <button onClick={signIn} className="btn-primary mt-7 w-full">Continue as {selected.label}</button>
        <p className="mt-4 text-center text-xs text-slate-400">Demo selector only. Replace this with your existing OTP/Google sign-in and set the same quickdrop_role cookie.</p>
      </div>
    </main>
  );
}
