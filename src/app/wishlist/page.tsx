"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeartIcon } from "@/components/Icons";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const products = wishlist
    .map((w) => getProductBySlug(w.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <h1 className="mb-6 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">My Wishlist</h1>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-rose">
            <HeartIcon width={28} height={28} />
          </div>
          <p className="mt-5 text-sm text-clay">Your wishlist is empty. Tap the heart on any product to save it here.</p>
          <Link href="/" className="btn-primary mt-6">Discover Products</Link>
        </div>
      ) : (
        <ProductGrid products={products} reveal={false} />
      )}
    </div>
  );
}
