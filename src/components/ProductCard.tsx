"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { discountPercent } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Price } from "./Price";
import { StarRating } from "./StarRating";
import { HeartIcon, BagIcon } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleWish, isWished } = useCart();
  const [added, setAdded] = useState(false);
  const discount = discountPercent(product);
  const wished = isWished(product.slug);

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem(product, {
      size: product.sizeVariants?.[0]?.label ?? product.size,
      color: product.colorVariants?.[0]?.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal/8 bg-white card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-rose px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              {discount}% OFF
            </span>
          )}
          {product.newArrival && (
            <span className="rounded-full bg-charcoal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-warm">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWish(product)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-colors ${
            wished ? "text-rose" : "text-charcoal hover:text-rose"
          }`}
        >
          <HeartIcon filled={wished} width={17} height={17} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/55">
            <span className="rounded-full bg-charcoal/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-warm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop hover Add-to-cart */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="btn-primary w-full !py-2.5 !text-[10px] disabled:opacity-60"
          >
            {added ? "Added ✓" : product.inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-clay">
          {product.subcategoryName}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 font-sans text-sm font-medium leading-snug text-charcoal hover:text-rosedeep sm:text-[15px]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5">
          <StarRating rating={product.rating} size={12} />
          <span className="text-[11px] text-clay">({product.reviewCount})</span>
        </div>

        <div className="mt-2">
          <Price price={product.price} originalPrice={product.originalPrice} size="sm" />
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-charcoal/70 py-2 text-[11px] font-medium uppercase tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-warm disabled:opacity-40 md:hidden"
            >
              <BagIcon width={14} height={14} />
              {added ? "Added" : "Add"}
            </button>
            <Link
              href={`/product/${product.slug}?order=1`}
              className="flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-gold to-golddeep py-2 text-[11px] font-medium uppercase tracking-wide text-white transition hover:brightness-105"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
