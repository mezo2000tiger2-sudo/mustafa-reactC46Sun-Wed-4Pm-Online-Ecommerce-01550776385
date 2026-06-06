# AGENTS.md

## Project
- **Freshcart** — Next.js 16 (App Router) + React 19 e-commerce frontend.
- `package.json` `name` is `proj` (placeholder). Don't rename unless asked.
- External API: `https://ecommerce.routemisr.com/api/v1` (see `src/auth.ts:19`).
- See also `GEMINI.md` for higher-level project notes.

## Commands
- `npm run dev` — Next dev server (port 3000).
- `npm run build` / `npm run start` — production.
- `npm run lint` — ESLint only (`eslint-config-next` core-web-vitals + typescript, see `eslint.config.mjs`).
- **No `test` and no `typecheck` script.** Don't invent one; if a check is needed, run `npx tsc --noEmit` (tsconfig is strict) or the build.
- Recommended verification order: `lint` → `build` (the build also surfaces type errors).

## Environment
- Required in `.env.local`:
  - `NEXTAUTH_SECRET` (generate via `npx auth`)
  - `API` and `NEXT_PUBLIC_API` — both set to the routemisr base URL. Don't drop `NEXT_PUBLIC_API`; client code reads it.
- `.env*` is gitignored; never commit secrets.

## Path / config quirks
- Path alias: `@/*` → `./src/*` (`tsconfig.json`).
- Tailwind v4: **no `tailwind.config.js`**. Config lives in `src/app/globals.css` via `@theme` (shadcn `new-york` style, neutral base, see `components.json`).
- `next.config.ts` whitelists `ecommerce.routemisr.com` for `next/image` — extend `images.remotePatterns` if adding new image hosts.
- `postcss.config.mjs` uses `@tailwindcss/postcss` (v4 plugin), not the classic v3 pipeline.

## Source layout
- `src/app/` — App Router routes + `_components`, `_servecies`, `_type`, `providors` (note misspelling).
- `src/app/_servecies/**` — Server Actions for mutations (cart, wishlist, orders, address, reviews, reset-password). The leading underscore and typo are intentional to keep them out of the route tree.
- `src/components/ui/` — shadcn primitives (Radix-based). Add new shadcn components here.
- `src/schema/` — Zod schemas used by React Hook Form.
- `src/lib/utils.ts` — `cn` helper (clsx + tailwind-merge).
- `src/auth.ts` — NextAuth config (Credentials provider, JWT session, `token` and `user` carried into the session for downstream API calls).
- `src/middleware.ts` — route protection.

## Auth & middleware
- NextAuth `signIn` page is `/login` (`src/auth.ts:8`).
- Middleware protects (unauth → `/login?callback-url=…`):
  `/cart`, `/profile`, `/wishlist`, `/updatepassword`, `/UpdateuserData`, `/chekout`, `/allorders`, `/addresses`, `/addadress`, `/orderdetails`.
- Middleware redirects authed users away from:
  `/login`, `/register`, `/forgetpassword`, `/verefyresetcode`, `/resetpassword`.
- **Case-sensitive mismatch:** middleware lists `/UpdateuserData` (capital U) but the actual route folder is `src/app/updateuserdata/`. Treat that route as broken in the current middleware — don't "fix" it without confirming the intended casing with the user.

## Naming gotchas (preserve as-is unless refactoring)
Folder names are misspelled and inconsistent on purpose in the current codebase; grep before renaming:
- `regestier/` (register)
- `chekout/` (checkout)
- `verefyresetcode/` (verify reset code)
- `UpdateuserData/` vs `updateuserdata/` (mixed case — see above)
- `_servecies/` (services)
- `providors/` (providers)

## Providers
Root layout wraps the app in `Providers` (React Query) → `NextAuthProvidor` (NextAuth SessionProvider) → `Nav` → `{children}` → `Toaster` → `Fotter`. Add new client-side context providers inside the existing tree in `src/app/layout.tsx`.

## Data fetching pattern
- Server Components for reads where possible; pass data down.
- Client interactivity (sliders, forms, dialogs) uses `'use client'`.
- Mutations go through Server Actions in `_servecies/`, which pull the bearer token from the NextAuth session — see `src/app/_servecies/cart/add_to_cart.ts` for the canonical pattern.
- Client-side caching/fetches use TanStack Query via the `Providers` wrapper.

## Style conventions
- Use the existing Radix/shadcn primitives in `src/components/ui/`; do not introduce a competing UI library.
- Icons via `lucide-react` (configured in `components.json`).
- Sliders: `swiper` and `embla-carousel-react` are both present — match what neighboring code uses.
- No formatter is configured; follow the existing 2/4-space, single-quote, no-semicolon style already in the file you're editing.
