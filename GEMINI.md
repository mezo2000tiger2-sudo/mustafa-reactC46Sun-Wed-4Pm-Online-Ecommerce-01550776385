# GEMINI.md

## Project Overview
Freshcart is a modern E-commerce web application built using Next.js 16 and React 19. It provides features like product browsing, category management, wishlist, shopping cart, and order placement. The application communicates with an external e-commerce API (`https://ecommerce.routemisr.com`).

## Tech Stack
- **Framework:** Next.js 16.1.4 (App Router)
- **Library:** React 19.2.3
- **Styling:** Tailwind CSS 4.x
- **Authentication:** NextAuth.js 4.24.13
- **Data Fetching:** TanStack Query (React Query) 5.90.20
- **Forms:** React Hook Form with Zod validation
- **Animations:** GSAP 3.14.2
- **Sliders:** Swiper 12.1.0 & Embla Carousel 8.6.0
- **UI Components:** Radix UI (Shadcn UI architecture)
- **Icons:** Lucide React

## Architecture & Conventions
- **Server Actions:** Most data mutations and sensitive API calls are handled via Server Actions in `src/app/_servecies`.
- **External API:** The application is a frontend for `https://ecommerce.routemisr.com`. Authentication tokens are passed in headers as `token`.
- **Zod Schemas:** Input validation and schema definitions are located in `src/schema`.
- **NextAuth Integration:** Authentication uses a custom Credentials provider. Tokens from the external API are stored in the NextAuth JWT/Session.
- **Server Components:** Prioritize React Server Components for data fetching where possible.
- **Client Components:** Use `'use client'` for interactive UI elements (sliders, forms, dialogs).

## Authentication & API
- **Auth Provider:** NextAuth configuration is in `src/auth.ts`.
- **Token Management:** The external API token is extracted from the session cookie in Server Actions (see `src/app/_servecies/cart/add_to_cart.ts`).
- **Protected Routes:** Managed via `src/middleware.ts`. 
  - **Protected Pages:** `/cart`, `/profile`, `/wishlist`, `/updatepassword`, `/UpdateuserData`, `/chekout`, `/allorders`, `/addresses`, `/addadress`, `/orderdetails`. Unauthenticated users are redirected to `/login`.
  - **Auth Pages:** `/login`, `/register`, `/forgetpassword`, `/verefyresetcode`, `/resetpassword`. Authenticated users are redirected to the home page (`/`).

## Commands
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production application.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.

## Key Directories
- `src/app`: App Router structure, routes, and page components.
- `src/app/_components`: Reusable UI components specific to the app.
- `src/app/_servecies`: Business logic and API calls (Server Actions).
- `src/app/_type`: TypeScript interfaces and type definitions.
- `src/components/ui`: Base UI primitives (Radix UI / Shadcn UI).
- `src/schema`: Zod validation schemas.
- `src/lib`: Utility functions.
- `src/assets`: Images and SVG assets.

## Development Notes
- **UI Consistency:** Follow the existing Radix UI pattern for new components.
- **Environment Variables:** Ensure `NEXTAUTH_SECRET` and other required variables are set in `.env.local`.
- **React Query:** Use the `Providers` component in `layout.tsx` for server state management.
