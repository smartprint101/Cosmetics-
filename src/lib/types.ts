import type { CategorySlug } from "@/config/categories";

export type SkinType =
  | "Normal"
  | "Dry"
  | "Oily"
  | "Combination"
  | "Sensitive"
  | "All Skin Types";

export type HairType =
  | "Normal"
  | "Dry"
  | "Oily"
  | "Frizzy"
  | "Damaged"
  | "All Hair Types";

export interface Ingredient {
  name: string;
  note: string;
}

export interface HowToStep {
  step: string; // "01"
  title: string;
  detail: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface Variant {
  label: string; // "50ml", "Rose"
  image?: string; // optional image swap
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string; // subcategory slug
  subcategoryName: string;
  brand: string;
  collection?: string;

  price: number; // current price
  originalPrice: number; // strike-through price

  images: string[];

  shortDescription: string;
  fullDescription: string;

  ingredients?: Ingredient[];
  benefits: string[];
  howToUse: HowToStep[];

  suitableFor: string[];
  skinType?: SkinType[];
  hairType?: HairType[];

  sizeVariants?: Variant[]; // 30ml / 50ml, or S/M/L
  colorVariants?: Variant[]; // Nude / Rose / shade

  size?: string; // default size label

  inStock: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];

  bestSeller?: boolean;
  newArrival?: boolean;
  featured?: boolean;
  tags?: string[];
}

export function discountPercent(p: Pick<Product, "price" | "originalPrice">): number {
  if (!p.originalPrice || p.originalPrice <= p.price) return 0;
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}
