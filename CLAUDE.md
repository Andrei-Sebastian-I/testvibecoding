# CLAUDE.md — testvibecoding

## Project Overview

Premium home decor e-commerce store with a full admin dashboard.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5.9 (strict) · Tailwind CSS 4.2 · Recharts 3.7 · Supabase client (not yet active)

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
npm start        # Production server
```

**Required env vars** (`.env.local`):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `ADMIN_PASSWORD` | Admin login password |
| `ADMIN_SESSION_SECRET` | HMAC-SHA256 signing secret for session tokens |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (optional) |

## Architecture

### Route Structure

```
app/
├── page.tsx                    # Public home — hero, products, testimonials
├── about/                      # About page
├── gallery/                    # Image gallery
├── products/                   # Product listing + [id] detail pages
├── admin/
│   ├── login/                  # Login form
│   └── (dashboard)/            # Protected route group
│       ├── page.tsx            # KPI cards + charts + transactions
│       ├── balance/            # Financial transactions
│       ├── expenses/           # Expense tracking
│       ├── products/           # Product CRUD
│       ├── sales/              # Sales tracking
│       ├── stock/              # Inventory management
│       ├── settings/           # Admin config
│       └── testimonials/       # Testimonial management
└── api/admin/                  # REST API routes (login, logout, CRUD)
```

### Key Directories

| Path | Purpose |
|------|---------|
| `components/` | Shared UI components (navbar, footer, product-card, etc.) |
| `components/admin/` | Admin-specific components (sidebar, header, forms, tables) |
| `components/home/` | Homepage section components |
| `components/navbar/` | Navigation components |
| `context/` | React Context providers (favorites) |
| `lib/` | Supabase client, product/testimonial data, constants |
| `lib/admin/` | Auth utilities, in-memory data stores |
| `hooks/` | Custom hooks (PWA service worker, install prompt) |
| `public/icons/` | PWA icons |

### Data Layer

All admin data uses **in-memory stores** (`lib/admin/*-store.ts`) with a global singleton pattern (`declare global`). Data resets on server restart.

Stores: `product-store.ts`, `sales-store.ts` (33 seed records), `expenses-store.ts`, `stock-store.ts`, `testimonials-store.ts`

Supabase client is initialized in `lib/supabase.ts` but **not yet integrated** — the app runs entirely on in-memory data.

### Data Models

- **Product**: id, name, price, subtitle, description, image, images[], category
- **Sale**: id, productName, quantity, unitPrice, total, customer, date
- **Expense**: id, category, amount, description, date
- **StockEntry**: id, productName, stock
- **Testimonial**: id, name, role, initials, text, rating

### Auth Flow

1. Admin submits password → `POST /api/admin/login`
2. Server validates against `ADMIN_PASSWORD` env var
3. HMAC-SHA256 token created with 24h expiry (`lib/admin/auth.ts`)
4. Token stored in httpOnly cookie (`admin_session`, secure in production)
5. `middleware.ts` validates token on all `/admin/*` and `/api/admin/*` routes (except login)
6. Invalid/expired → redirect to `/admin/login`

### PWA

Admin dashboard is installable as a PWA:
- Manifest: `public/admin-manifest.webmanifest`
- Service worker registration: `hooks/use-admin-sw.ts`
- Install prompt: `hooks/use-install-prompt.ts`
- PWA layout configured in `app/admin/layout.tsx`

## Code Conventions

- **Path alias**: `@/*` → project root (configured in `tsconfig.json`)
- **Fonts**: Manrope (body), Playfair Display (decorative), Material Symbols Outlined (icons)
- **CSS**: Tailwind 4.2 with custom CSS variables for brand colors in `globals.css`
  - Primary: `#58492c`, Brand Gold: `#C5A059`, Accent Gold: `#B8960E`, Brand Green: `#2D5A3D`
- **Images**: Remote images from `lh3.googleusercontent.com` (allowed in `next.config.ts`)
- **Favorites**: Client-side only via React Context + localStorage (`context/favorites-context.tsx`)
- **Store pattern**: Each store exports CRUD functions, uses `structuredClone` for immutability
- **File naming**: kebab-case for all files (`product-card.tsx`, `use-admin-sw.ts`), PascalCase for exports
- **ESLint**: Next.js Core Web Vitals + TypeScript strict rules

## Gotchas

- **In-memory stores reset on every server restart** — no persistence layer yet
- **Supabase client exists but is unused** — migration to real DB is pending
- **Default admin credentials are in `.env.local`** — change before any deployment
- **No test framework** — no Jest, Vitest, or Playwright configured
- **Node 24+ required** (`.nvmrc`)
- **SEO files** exist (`robots.ts`, `sitemap.ts`) — update `NEXT_PUBLIC_SITE_URL` for production
