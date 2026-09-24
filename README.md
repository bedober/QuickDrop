# QuickDrop UG

All-in-one Uganda delivery and mobility platform for food, parcels, and rides.

## Stack
- Next.js 14 + TypeScript + Tailwind CSS mobile-first frontend
- Express + Socket.IO API scaffold
- MongoDB-ready domain model boundaries
- UGX pricing, Kampala-first service experience

## Run
```bash
npm install
npm run dev
```

The demo uses local dummy data for six restaurants, riders, orders, and rides. Set `NEXT_PUBLIC_GOOGLE_MAPS_KEY` and payment/provider credentials when connecting production services.

## Product areas
- `/` customer home with Food, Courier, and Ride tabs
- `/tracking/[id]` live job tracking and rider chat
- `/account` customer wallet, orders, addresses, and favorites
- `/rider` rider operations dashboard
- `/admin` admin-only operations console
