import { cookies } from 'next/headers';

export type UserRole = 'admin' | 'rider' | 'customer' | null;

export async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  const role = cookieStore.get('userRole')?.value as UserRole;
  return { token, role };
}

export function setAuth(token: string, role: UserRole) {
  const c = document.cookie;
  document.cookie = `authToken=${token}; path=/; max-age=2592000; secure; samesite=strict`;
  document.cookie = `userRole=${role}; path=/; max-age=2592000; secure; samesite=strict`;
}

export function clearAuth() {
  document.cookie = `authToken=; path=/; max-age=0`;
  document.cookie = `userRole=; path=/; max-age=0`;
}
