import { getProductBySlug } from "./products";
import type { Product } from "@/lib/types";

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  description: string;
  productSlugs: string[];
  bundlePrice: number;
  image: string;
}

export const bundles: Bundle[] = [
  {
    id: "bundle-glow",
    slug: "glow-starter-kit",
    name: "Glow Starter Kit",
    description: "The perfect trio to start your glow routine — cleanse, treat and hydrate.",
    productSlugs: ["hydra-glow-face-wash", "vitamin-c-brightening-serum", "daily-barrier-moisturizer"],
    bundlePrice: 2990,
    image:
      "/products/moisturizer.jpg",
  },
  {
    id: "bundle-hair",
    slug: "hair-care-essentials",
    name: "Hair Care Essentials",
    description: "Everything your hair needs to look soft, smooth and healthy.",
    productSlugs: ["nourish-shampoo", "smooth-conditioner", "repair-hair-serum"],
    bundlePrice: 1990,
    image:
      "/products/shampoo.jpg",
  },
];

export interface BundleResolved extends Bundle {
  products: Product[];
  originalTotal: number;
}

export function resolveBundle(bundle: Bundle): BundleResolved {
  const products = bundle.productSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p));
  const originalTotal = products.reduce((sum, p) => sum + p.price, 0);
  return { ...bundle, products, originalTotal };
}

export const resolvedBundles = bundles.map(resolveBundle);

export function getBundleBySlug(slug: string): BundleResolved | undefined {
  return resolvedBundles.find((b) => b.slug === slug);
}

// Routine-based discovery
export interface Routine {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  productSlugs: string[];
}

export const routines: Routine[] = [
  {
    slug: "morning-skincare",
    title: "Morning Skincare",
    subtitle: "Cleanse, protect and glow to start the day",
    image:
      "/products/sunscreen.jpg",
    productSlugs: [
      "hydra-glow-face-wash",
      "vitamin-c-brightening-serum",
      "daily-barrier-moisturizer",
      "daily-shield-sunscreen",
    ],
  },
  {
    slug: "night-skincare",
    title: "Night Skincare",
    subtitle: "Repair and replenish while you sleep",
    image:
      "/products/mask.jpg",
    productSlugs: [
      "gentle-foaming-face-wash",
      "rose-water-toner",
      "niacinamide-oil-control-serum",
      "overnight-repair-moisturizer",
    ],
  },
  {
    slug: "makeup-essentials",
    title: "Makeup Essentials",
    subtitle: "Your everyday base, lip and eye kit",
    image:
      "/products/foundation.jpg",
    productSlugs: [
      "soft-matte-foundation",
      "natural-cover-concealer",
      "velvet-matte-lipstick",
      "define-mascara",
    ],
  },
  {
    slug: "hair-care-routine",
    title: "Hair Care Routine",
    subtitle: "Wash, condition and smooth for healthy hair",
    image:
      "/products/hairmask.jpg",
    productSlugs: ["nourish-shampoo", "smooth-conditioner", "deep-repair-hair-mask", "repair-hair-serum"],
  },
  {
    slug: "self-care",
    title: "Self Care",
    subtitle: "Unwind with a little body-care ritual",
    image:
      "/products/scrub.jpg",
    productSlugs: ["coffee-body-scrub", "velvet-body-lotion", "velvet-bloom-body-mist", "soft-touch-hand-cream"],
  },
];

export function getRoutineBySlug(slug: string): Routine | undefined {
  return routines.find((r) => r.slug === slug);
}
