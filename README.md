# QuickDrop UG

QuickDrop is an existing food delivery experience extended with courier service and ride booking. The current UI preserves the original Tailwind tokens and component language.

## Added modules
- `/courier`: sender/receiver details, parcel type, weight, photo input, and UGX 3,000 + UGX 1,000/km quote.
- `/ride`: pickup/dropoff, route preview, vehicle selection, fare estimate, and booking state.
- Homepage tabs now link Food Delivery, Courier Service, and Book a Ride experiences.
- Rider dashboard includes Food, Courier, and Ride acceptance filters plus earnings breakdown.
- Admin dashboard includes ride/courier tables, live rider map, and commission controls.
- `middleware.ts` enforces role-aware route access using the existing `quickdrop_role` auth cookie.
- `server/models/Ride.ts` and `server/models/Order.ts` define MongoDB-compatible models without replacing existing models.

Production auth should set `quickdrop_role` after the existing login flow (`customer`, `rider`, or `admin`). The API additions in `server/index.ts` are integration points for the existing persistence/auth layer; no existing database data is replaced.
