# LUMÉRA — Premium Cosmetics & Beauty E-commerce (Demo)

> Beauty, Made Effortless.

A **premium, mobile-first, conversion-focused** cosmetics & beauty e-commerce **demo website** for the
Bangladesh market — built by **CodePixel Web** as a client showcase.

**LUMÉRA is a fictional demo brand.** No real payments, courier APIs, database, or backend are used.
The goal is a production-like frontend shopping experience.

## Tech Stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS**
- Reusable component architecture
- Zero unnecessary dependencies — Vercel-ready

## Features

- Premium homepage: hero, trust strip, shop-by-category, best sellers (12), offer banner,
  shop-by-routine, beauty bundles, new arrivals, customer reviews
- 30+ fictional products with full detail (SKU, ingredients, benefits, how-to-use, skin/hair type,
  size & shade variants, ratings & reviews)
- Category pages with sidebar filters (desktop) / filter drawer (mobile) + sort
- Sale page, bundle pages, routine pages
- Live search overlay + full search page
- Cart, Bangladesh-focused checkout (COD, inside/outside Dhaka delivery), order confirmation
- Wishlist, account, and info pages (Contact, Delivery, Returns, FAQ)
- Floating **WhatsApp** button with pre-filled message + CTA
- Fully responsive (2-column product grid on mobile), subtle premium animations, SEO metadata & Open Graph

## Centralized configuration

Everything a business owner would change lives in two files:

- `src/config/site.ts` — brand name, **WhatsApp number & CTA**, phone, email,
  **delivery charges**, social links, footer/contact info
- `src/data/products.ts` — all product data (used by home, category, search, product, cart, related, sale)

```ts
// src/config/site.ts
whatsappNumber: "8801876892958"   // international format for chat URLs
whatsappDisplay: "01876892958"    // local format shown in the UI
whatsappCta: "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।"
delivery: { insideDhaka: 70, outsideDhaka: 130 }
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # run the production build
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel — it auto-detects Next.js. No env vars required.
3. Deploy.

## Notes

- Product imagery is AI-generated on-brand demo photography (in `public/products`), not copied from any real brand.
- Reviews and trust badges are illustrative demo content, not verified claims.
- Fonts load via Google Fonts stylesheet at runtime (no build-time network needed).

---

Demo Website by **CodePixel Web**.
