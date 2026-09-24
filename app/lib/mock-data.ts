export type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  eta: string;
  rating: number;
  emoji: string;
  accent: string;
};

export type Rider = {
  id: number;
  name: string;
  vehicle: string;
  plate: string;
  rating: number;
  eta: string;
  color: string;
  emoji: string;
};

export const restaurants: Restaurant[] = [
  { id: 1, name: 'The Garden Grill', cuisine: 'African · Grills', eta: '25–35 min', rating: 4.8, emoji: '🍗', accent: 'bg-orange-100' },
  { id: 2, name: 'Kampala Bowl Co.', cuisine: 'Healthy · Bowls', eta: '20–30 min', rating: 4.7, emoji: '🥗', accent: 'bg-green-100' },
  { id: 3, name: 'Rolex Corner', cuisine: 'Local · Street food', eta: '15–25 min', rating: 4.9, emoji: '🌯', accent: 'bg-yellow-100' },
  { id: 4, name: 'Café Javas', cuisine: 'Café · Fast food', eta: '25–40 min', rating: 4.6, emoji: '☕', accent: 'bg-blue-100' },
  { id: 5, name: 'Nile Fish House', cuisine: 'Seafood · Local', eta: '35–45 min', rating: 4.8, emoji: '🐟', accent: 'bg-cyan-100' },
  { id: 6, name: 'Sweet Treats', cuisine: 'Desserts · Bakery', eta: '20–30 min', rating: 4.9, emoji: '🍰', accent: 'bg-pink-100' },
];

export const riders: Rider[] = [
  { id: 1, name: 'John K.', vehicle: 'Boda boda', plate: 'UEX 421B', rating: 4.9, eta: '2 min', color: 'bg-lime', emoji: '🏍️' },
  { id: 2, name: 'Derrick N.', vehicle: 'Tuk tuk', plate: 'UFK 908P', rating: 4.8, eta: '5 min', color: 'bg-emerald-200', emoji: '🛺' },
  { id: 3, name: 'Aisha M.', vehicle: 'Mini car', plate: 'UAM 210Q', rating: 4.7, eta: '7 min', color: 'bg-sky-200', emoji: '🚗' },
];

export const transactions = [
  { id: 'QD-1048', title: 'Ride to Acacia Mall', amount: 'UGX 6,500', time: 'Today · 10:42' },
  { id: 'QD-1039', title: 'The Garden Grill', amount: 'UGX 28,000', time: 'Yesterday · 19:20' },
  { id: 'QD-1022', title: 'Courier to Makerere', amount: 'UGX 5,000', time: '18 Sep · 14:05' },
];

export const adminMetrics = [
  { label: 'Revenue today', value: 'UGX 4,820,500', trend: '+12.4%' },
  { label: 'Total orders', value: '248', trend: '+8.2%' },
  { label: 'Active riders', value: '42', trend: 'Live now' },
  { label: 'Commission earned', value: 'UGX 964,100', trend: '20% avg' },
];
