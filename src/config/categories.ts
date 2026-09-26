export type CategorySlug =
  | "skincare"
  | "makeup"
  | "hair-care"
  | "body-care"
  | "fragrance"
  | "beauty-accessories";

export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
  subcategories: SubCategory[];
  navInHeader: boolean;
}

export const categories: Category[] = [
  {
    slug: "skincare",
    name: "Skincare",
    shortName: "Skincare",
    description:
      "Cleansers, serums, moisturisers and sun care to build a routine your skin will love — gentle, effective, everyday.",
    image:
      "/products/moisturizer.jpg",
    navInHeader: true,
    subcategories: [
      { name: "Face Wash", slug: "face-wash" },
      { name: "Moisturizer", slug: "moisturizer" },
      { name: "Serum", slug: "serum" },
      { name: "Sunscreen", slug: "sunscreen" },
      { name: "Toner", slug: "toner" },
      { name: "Face Mask", slug: "face-mask" },
    ],
  },
  {
    slug: "makeup",
    name: "Makeup",
    shortName: "Makeup",
    description:
      "Skin-loving base, lip and eye essentials for an effortless everyday look or a full glam moment.",
    image:
      "/products/lipstick.jpg",
    navInHeader: true,
    subcategories: [
      { name: "Foundation", slug: "foundation" },
      { name: "Concealer", slug: "concealer" },
      { name: "Lipstick", slug: "lipstick" },
      { name: "Lip Gloss", slug: "lip-gloss" },
      { name: "Blush", slug: "blush" },
      { name: "Mascara", slug: "mascara" },
      { name: "Eyeliner", slug: "eyeliner" },
    ],
  },
  {
    slug: "hair-care",
    name: "Hair Care",
    shortName: "Hair Care",
    description:
      "Nourishing shampoo, conditioner, oils and masks to keep hair healthy, soft and full of shine.",
    image:
      "/products/shampoo.jpg",
    navInHeader: true,
    subcategories: [
      { name: "Shampoo", slug: "shampoo" },
      { name: "Conditioner", slug: "conditioner" },
      { name: "Hair Serum", slug: "hair-serum" },
      { name: "Hair Mask", slug: "hair-mask" },
      { name: "Hair Oil", slug: "hair-oil" },
    ],
  },
  {
    slug: "body-care",
    name: "Body Care",
    shortName: "Body Care",
    description:
      "Lotions, washes and scrubs for soft, hydrated skin from head to toe.",
    image:
      "/products/bodylotion.jpg",
    navInHeader: true,
    subcategories: [
      { name: "Body Lotion", slug: "body-lotion" },
      { name: "Body Wash", slug: "body-wash" },
      { name: "Scrub", slug: "scrub" },
      { name: "Hand Cream", slug: "hand-cream" },
    ],
  },
  {
    slug: "fragrance",
    name: "Fragrance",
    shortName: "Fragrance",
    description:
      "Signature eau de parfum and light body mists to carry your scent through the day.",
    image:
      "/products/perfume.jpg",
    navInHeader: true,
    subcategories: [
      { name: "Perfume", slug: "perfume" },
      { name: "Body Mist", slug: "body-mist" },
    ],
  },
  {
    slug: "beauty-accessories",
    name: "Beauty Accessories",
    shortName: "Accessories",
    description:
      "Brushes, tools and everyday beauty accessories to complete your kit.",
    image:
      "/products/brush.jpg",
    navInHeader: false,
    subcategories: [
      { name: "Makeup Tools", slug: "makeup-tools" },
      { name: "Brushes", slug: "brushes" },
      { name: "Beauty Accessories", slug: "beauty-accessories" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const headerCategories = categories.filter((c) => c.navInHeader);
