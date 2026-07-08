# LoisnX

A premium car dealership web app: browse, filter, compare, finance,
trade in, and buy — plus a full admin dashboard for managing inventory.
Next.js 14 App Router, Tailwind, Firebase/Firestore + Cloudinary
(optional — runs on mock data out of the box).

## Run it

```bash
npm install
cp .env.local.example .env.local   # optional for now — see below
npm run dev
```

Open http://localhost:3000.

## About the backend wiring

`lib/firebase.js` and `lib/cloudinary.js` check for real credentials at
runtime (`isFirebaseConfigured` / `isCloudinaryConfigured`). With
`.env.local` empty, every data call in `lib/cars.js` silently falls back to
the mock dataset in `data/cars.js` — so the whole site runs end-to-end with
zero setup. Drop your real Firebase + Cloudinary keys into `.env.local`
whenever you're ready, and the app starts reading/writing live data with no
component changes needed. Firestore collection expected: `cars`, with
documents shaped exactly like the objects in `data/cars.js`.

## What's in this phase

- **Design system** — `tailwind.config.js` / `constants/theme.js`: Clash
  Display + Satoshi + JetBrains Mono, the ink/signal/velocity/trust/steel
  palette, the `ease-signature` motion curve.
- **Global layout** — `Navbar`, `MobileMenu`, `Footer`.
- **Compare Dock** (signature element) — `components/layout/CompareDock.jsx`.
  Add 2+ cars to compare from any `CarCard` and it docks to the bottom of
  the viewport, glassmorphic, with a running thumbnail stack. State
  persists in `localStorage` via `context/store.jsx` (`useCompare`,
  `useWishlist`) — the same store the Inventory/Wishlist/Compare pages will
  read from in later phases.
- **Homepage** — `app/page.jsx`: cinematic Hero with the InstrumentStrip
  telemetry ticker, Featured Cars (live from `lib/cars.js`), Shop by
  Category, Brand Story, animated Trust Metrics, Testimonials, and a
  closing trade-in CTA.
- **Data layer** — `lib/cars.js` + `data/cars.js`: 9 mock vehicles across
  Electric / Luxury SUV / Sport Sedan / Best Value, in the exact field
  shape from the brief's data model.

## Phase 2 additions

- **Inventory page** (`/inventory`) — `InventoryExperience.jsx` runs
  everything client-side over the full catalog: text search, category
  tabs, a full filter sidebar (make, body type, fuel type, transmission,
  drivetrain, color, features, availability, plus range sliders for
  price/year/mileage), sort, and "Load More" pagination. Empty state and
  a mobile filter drawer are included. Filter option lists and counts are
  derived live from whatever's in `data/cars.js` / Firestore — nothing is
  hardcoded, so adding a car with a new make or color just works.
- **Car detail page** (`/inventory/[id]`) — gallery slider (falls back to
  labeled placeholder angles until real photos exist), spec grid,
  description, feature list, an interactive financing teaser
  (`lib/finance.js` — shared amortization math, reused later by the full
  Payment Calculator), save/compare/buy actions, a trade-in entry point,
  and related vehicles.

## Phase 3 additions

- **Checkout flow** (`/checkout?carId=...`) — a 5-step wizard (Trim →
  Payment → Extras → Trade-In → Review) with a sticky running-total
  sidebar. Trims are generated deterministically per car
  (`lib/trims.js`), pricing math lives in `lib/pricing.js` (vehicle price
  + trim + extras + est. tax + doc fee – trade-in credit), and financing
  reuses the same amortization function from Phase 2. Submitting writes
  a real order via `lib/orders.js` — Firestore `orders` collection if
  configured, otherwise localStorage — and redirects to
  **`/checkout/confirmation?orderId=...`**, which loads that order back
  and shows a full confirmation with next steps.
- **`/compare`** — full side-by-side spec + feature table for whatever's
  queued in the Compare Dock (2–3 cars), with a remove button per column.
- **`/financing`** — standalone payment calculator with a vehicle
  picker, down payment slider, credit-tier buttons, term selector, and a
  principal-vs-interest breakdown. Accepts `?carId=` to preselect a car
  coming from its detail page.
- **`/trade-in`** — standalone trade-in estimator (`TradeInForm`, shared
  with the checkout wizard's Trade-In step) with a transparent, explained
  formula (`lib/tradein.js`). Accepts `?applyToCarId=` from a car detail
  page and offers a direct path into checkout once an estimate is shown.

## Phase 4 additions

- **`/wishlist`** — saved cars grid, driven by the same `useWishlist`
  store from the Compare Dock. Empty state included.
- **Admin auth** (`lib/auth.js` + `hooks/useAdminAuth.js`) — real Firebase
  Auth email/password when configured; a localStorage-backed session
  otherwise (any email + a 4+ character password signs in). `/admin/*`
  routes are guarded by `AdminGuard` and redirect to `/admin/login`
  when signed out.
- **`/admin`** — dashboard overview: quick stat cards (stock count,
  available, featured, orders placed), estimated active inventory value,
  and recent vehicles/orders tables.
- **`/admin/cars`** — full management table: search, inline status
  change (available/reserved/sold), inline featured toggle, edit, and
  delete (with a confirmation modal). Deletes and edits go through
  `lib/cars.js` — real Firestore writes once configured, localStorage
  overrides otherwise.
- **`/admin/cars/new`** and **`/admin/cars/[id]/edit`** — the full Add/Edit
  Car form from the brief (name, make, model, year, price, mileage,
  transmission, fuel type, drivetrain, body type, color, condition,
  stock #/VIN, horsepower, range, category, features as tags,
  description, status, featured toggle) plus a Cloudinary image
  uploader with live previews — falls back to local-only preview URLs
  when Cloudinary isn't configured yet, clearly labeled as such in the UI.

**Important scope note on mock mode:** without real Firestore keys,
admin changes are fully live and testable inside the Admin section
itself (the whole add/edit/delete/status/featured workflow works end to
end via localStorage). They won't appear on the public Inventory/Home
pages in that mode, though, since those are server-rendered and
localStorage only exists in the browser. Add your Firestore keys and
every admin change appears everywhere immediately — no code changes
needed.

## Phase 5 additions

- **`/about`** — brand story, values grid, animated-style stat row, a
  milestones timeline, closing CTA.
- **`/contact`** — contact form (name, email, topic, message) that
  writes to Firestore's `contactSubmissions` collection when configured,
  localStorage otherwise, plus a contact-info sidebar.
- **`/faq`** — categorized FAQ accordion (`FAQAccordion`, reusable)
  covering buying, financing, trade-in, and admin questions.
- **Trade-in submissions now log to Firestore too** — every estimate
  generated via `TradeInForm` (checkout step or standalone page) writes
  to a `tradeInSubmissions` collection when configured, matching the
  brief's Firestore integration list (cars, orders, contact form, and
  trade-in submissions are now all wired the same way).

Every core page from the original brief now exists: Home, Inventory,
Car Detail, Compare, Payment Calculator, Trade-In, Wishlist, Checkout +
Confirmation, Admin Dashboard, Add/Edit Car, Admin Login, About,
Contact, FAQ.

## Phase 6 — design system rebuild

Phase 6 was originally scoped as motion polish + responsive QA. Mid-way
through, feedback came back that the visual design wasn't landing —
every dimension (palette, type, spacing, motion, overall vibe) needed
work — so this phase became a full design system rebuild instead.

The original direction leaned too hard into a dark, cinematic,
Porsche/Rivian-style mood — generic and cold rather than distinctive.
Rebuilt around **Carvana/Cazoo: friendly, approachable, colorful**,
keeping the brief's original Yellow/White/Red/Blue brand palette:

- **Palette** — brighter, punchier signal-yellow and trust-blue, a
  warmer coral-red, and a neutral near-black `ink` (was navy-tinted).
  White carries even more of the layout now; the dark, moody full-bleed
  sections (Hero, the CTA band, the trust-metrics band, the About page
  stats band, the mobile menu) were rebuilt as bright white or bold
  color blocks (blue, yellow) instead.
- **Type** — Cabinet Grotesk replaces Clash Display for display type
  (rounder, friendlier, still bold). Heading tracking loosened
  site-wide from `-0.04em` to `-0.01em` — this one token change fixes
  the "everything feels dense" problem across every heading in the app.
  Mono (JetBrains Mono) is now reserved for genuinely tabular data
  (prices, VINs, order IDs) instead of being used everywhere for
  labels/eyebrows.
- **Shape & spacing** — border radius bumped up a step everywhere
  (`rounded-2xl` / `3xl` now compute larger), cards use `border-2` for
  a chunkier, friendlier edge, and new `shadow-soft` / `shadow-pop` /
  `shadow-friendly` tokens replace hardcoded shadow colors. A new
  shared `.eyebrow` pill-badge class replaces the old mono uppercase
  label pattern across every page.
- **Motion** — new `ease-bouncy` timing function (a spring-like
  overshoot curve) now drives buttons, cards, and the Compare Dock; the
  original cinematic ease is kept only for slower page-level reveals.
- Removed the grain/noise texture and dark radial glows entirely.

Because color, radius, and shadow are theme tokens rather than
hardcoded values, most of the app re-skinned automatically once the
tokens changed. Hand-redesigned on top of that: `Button`, `Badge`,
`CarMedia`, `CarCard`, `Navbar`, `MobileMenu`, `Footer`, `CompareDock`,
`InstrumentStrip`, and every homepage section.

Full responsive QA and a final build-verification pass (manual, since
this sandbox has no network access for `npm install`/`npm run build`)
are still open — see the note in chat for what that will cover.
