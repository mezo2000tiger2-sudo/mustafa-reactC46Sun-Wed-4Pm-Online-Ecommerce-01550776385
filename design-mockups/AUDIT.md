# Freshcart — real app vs design preview audit

Last checked against `src/app/**` and `design-mockups/gallery.html`.

**Real Next.js code:** unchanged (preview-only workflow). Only `design-mockups/` is the redesign artifact.

---

## Pages coverage

| Route | In real app | In gallery | Notes |
|-------|-------------|------------|-------|
| `/` | yes | yes (#home) | |
| `/categories` | yes | yes | |
| `/categories/[id]` | yes | yes (#category-detail) | |
| `/brands` | yes | yes | |
| `/brands/[id]` | yes | yes (#brand-detail) | |
| `/productdetails/[id]` | yes | yes (#product) | |
| `/cart` | yes | yes (#cart) | |
| `/chekout/[cartId]` | yes | yes (#checkout) | |
| `/profile` | yes | yes | |
| `/addresses` | yes | yes | |
| `/addadress` | yes | yes (#add-address) | |
| `/allorders` | yes | yes (#orders) | |
| `/orderdetails` | yes | yes (#order-detail) | |
| `/wishlist` | yes | yes | |
| `/updatepassword` | yes | **missing** | Linked from profile |
| `/updateuserdata` | yes | **missing** | Linked from profile |
| `/login` | yes | skipped (auth) | intentional |
| `/regestier` | yes | skipped (auth) | intentional |
| `/forgetpassword` | yes | skipped (auth) | intentional |
| `/verefyresetcode` | yes | skipped (auth) | intentional |
| `/resetpassword` | yes | skipped (auth) | intentional |

---

## Shared layout (every page) — mostly missing from gallery

| Feature | Real app | Gallery |
|---------|----------|---------|
| **Nav** logo (SVG) | yes | text “Freshcart” only |
| **Nav** Home / Categories / Brands | yes | yes (in each mock nav) |
| **Nav** Login + Register (logged out) | yes | not shown |
| **Nav** User avatar dropdown | Profile, Wishlist, Orders, Logout | not shown |
| **Nav** Cart icon + item count badge | yes (logged in) | icon only, no count |
| **Nav** Mobile hamburger menu | yes | not shown |
| **Footer** “Get the Freshcart app” + email + App Store / Play badges | yes | not on any screen |
| **Loading** full-page spinner (`loading.tsx`) | yes | not in gallery |
| **Toasts** (react-hot-toast) | yes | n/a in static HTML |

---

## Per-screen: forgotten in preview

### Home
- HomeSwipper (75% slider + 25% two blog images)
- CategorySlider (horizontal categories from API)
- Product grid uses real `ProductCard` (brand badge, wishlist via card footer)

### Category / brand detail
- Empty state: **“No products found”** (centered on green background)

### Product details
- `ProductImages` main gallery + thumbnail strip
- **Add to cart** + **wishlist heart** (`AddBTN`)
- **Customer Reviews** block with count badge
- **Add review** (logged-in users)
- **Update / delete review** (own reviews)
- Star rating per review
- **“No reviews yet”** empty state

### Cart
- **Clear cart** (top-right link)
- **Delete item** (trash per row)
- Line total = `price × count` on each row
- **Coupon** input + Apply
- **Empty cart** UI + “Start Shopping” link

### Checkout (real app today)
- Right column: **Subtotal list** (separate white card above form)
- Form fields: `details`, `phone`, `city`, `postalCode` (cash only)
- **“See all Saved Addresses”** → dialog (`LocationDrawer`) — not inline cards
- Visa payment **drops postalCode** on submit

### Profile
- Three links styled differently (Addresses green, password/data red tones)

### Addresses list
- Shows **city, details, phone** per card (API also has `name` when saving, but list UI doesn’t show name today)
- **Delete** address (trash) — not edit

### Wishlist
- Large **“My Wishlist”** heading
- Uses **ProductCard** grid (same as shop)
- **Empty wishlist** state + Start Shopping
- **Error** state with retry

### Order details (real app)
- Has: order id, `paymentMethodType` badge, customer block (name, email, phone), items, shipping, tax, total, payment method row
- **Not shown in app UI:** `isDelivered`, `isPaid` (data exists on `Order` type)

---

## Per-screen: added in preview (not in real app yet)

These are **design proposals** — do not implement until approved.

### Home
- Editorial hero (“Farm-traceable”, asymmetric layout, CTA buttons) — real home is slider + categories + grid only

### Brands grid
- Brand **names under logos** — real brands page is image-only

### Checkout (#checkout)
- **Inline saved-address radio cards** (real app uses hidden dialog link)
- **Order receipt** with product thumbnails in right column (real app: simple subtotal text list)
- **`name` field on checkout form** — checkout API uses `{ details, phone, city, postalCode? }` only; **`name` is for `/addadress` API**, not pay-order shipping
- Combined receipt + address + payment in one right panel

### Add address / addresses
- JSON API example block (helpful for devs, not UI in app)
- Address cards show **`name`** field explicitly (save API yes; list UI in app doesn’t show name today)

### Order detail
- Extra **second card** (visa / paid example) below the main one
- **Shipping address** subsection (phone, city, details) — real order details page focuses on customer block, not a separate shipping box

### General gallery
- Warm paper / Fraunces / IBM Plex theme — real app still uses green `bg-main`, Geist fonts, gray nav/footer

---

## API field cheat sheet (avoid mixing checkout vs address)

| Action | Fields |
|--------|--------|
| **POST** `/api/v1/addresses` | `name`, `details`, `phone`, `city` |
| **Checkout shipping** (pay cash/visa) | `details`, `phone`, `city`, `postalCode` (cash only; omitted for visa) |
| **Order card** (all orders) | customer name, shipping phone/city/details, total, product thumbs, paid badge |
| **Order detail** | user name/email/phone, `paymentMethodType`, items, shipping, tax, total |

---

## Recommended next preview additions

1. **#update-password** and **#update-user-data** screens (from profile links)
2. **Empty states:** cart, wishlist, category/brand with no products
3. **Nav + footer** component strip (logged-in vs logged-out)
4. **Product details:** reviews + add-to-cart/wishlist row
5. **Cart:** clear cart, delete item, coupon (partially there)
6. **Checkout:** fix preview — remove `name` from checkout manual form; show LocationDrawer pattern OR keep inline cards but label as “approved replacement”
7. **Loading** spinner screen (optional)

When you approve sections, implement in `src/app/` one route at a time.
