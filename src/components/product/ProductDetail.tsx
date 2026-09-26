"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { discountPercent } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { siteConfig, formatBDT } from "@/config/site";
import { Price } from "@/components/Price";
import { StarRating } from "@/components/StarRating";
import {
  HeartIcon,
  PlusIcon,
  MinusIcon,
  CashIcon,
  TruckIcon,
  ShieldIcon,
  HeadsetIcon,
  CheckIcon,
} from "@/components/Icons";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, toggleWish, isWished } = useCart();
  const router = useRouter();

  const [size, setSize] = useState(product.sizeVariants?.[0]?.label ?? product.size);
  const [color, setColor] = useState(product.colorVariants?.[0]?.label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Image gallery — color variant can swap the active image
  const gallery = useMemo(() => {
    const imgs = [...product.images];
    (product.colorVariants ?? []).forEach((v) => {
      if (v.image && !imgs.includes(v.image)) imgs.push(v.image);
    });
    return imgs;
  }, [product]);

  const activeColorImage = product.colorVariants?.find((v) => v.label === color)?.image;
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = activeColorImage ?? gallery[activeIdx] ?? gallery[0];

  const discount = discountPercent(product);
  const wished = isWished(product.slug);

  const doAdd = () => {
    addItem(product, { size, color, quantity: qty, image: activeImage });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const orderNow = () => {
    addItem(product, { size, color, quantity: qty, image: activeImage });
    router.push("/checkout");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Gallery */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-cream">
          <Image
            key={activeImage}
            src={activeImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="animate-fadeIn object-cover"
          />
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-rose px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-2.5">
          {gallery.map((img, i) => (
            <button
              key={img + i}
              onClick={() => {
                setActiveIdx(i);
                // clear color-driven image override so thumbnail wins
                if (activeColorImage) setColor(undefined);
              }}
              className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors sm:h-20 sm:w-20 ${
                activeImage === img ? "border-charcoal" : "border-transparent hover:border-charcoal/30"
              }`}
            >
              <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="eyebrow">{product.subcategoryName}{product.collection ? ` · ${product.collection}` : ""}</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <StarRating rating={product.rating} size={16} />
          <span className="text-sm text-clay">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Price price={product.price} originalPrice={product.originalPrice} size="lg" />
          {discount > 0 && (
            <span className="rounded-full bg-rose/10 px-2.5 py-1 text-xs font-semibold text-rosedeep">
              Save {formatBDT(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-ink/85">{product.shortDescription}</p>

        <div className="mt-4">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-600" /> In Stock — Ready to ship
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-rosedeep">
              <span className="h-2 w-2 rounded-full bg-rose" /> Currently Out of Stock
            </span>
          )}
        </div>

        {/* Color variants */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
              Shade: <span className="text-ink">{color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colorVariants.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setColor(v.label)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    color === v.label
                      ? "border-charcoal bg-charcoal text-warm"
                      : "border-charcoal/25 text-charcoal hover:border-charcoal/60"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size variants */}
        {product.sizeVariants && product.sizeVariants.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
              Size: <span className="text-ink">{size}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizeVariants.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setSize(v.label)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    size === v.label
                      ? "border-charcoal bg-charcoal text-warm"
                      : "border-charcoal/25 text-charcoal hover:border-charcoal/60"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + actions */}
        <div className="mt-7 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-charcoal/20">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="p-3 text-charcoal disabled:opacity-30" disabled={qty <= 1}>
              <MinusIcon width={16} height={16} />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="p-3 text-charcoal">
              <PlusIcon width={16} height={16} />
            </button>
          </div>
          <button
            onClick={() => toggleWish(product)}
            aria-label="Wishlist"
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/20 transition-colors ${
              wished ? "text-rose" : "text-charcoal hover:text-rose"
            }`}
          >
            <HeartIcon filled={wished} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button onClick={doAdd} disabled={!product.inStock} className="btn-outline w-full">
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
          <button onClick={orderNow} disabled={!product.inStock} className="btn-primary w-full">
            Order Now
          </button>
        </div>

        {/* Trust items */}
        <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-charcoal/8 bg-cream p-4">
          <Trust icon={CashIcon} label="Cash on Delivery Available" />
          <Trust icon={TruckIcon} label="Delivery Across Bangladesh" />
          <Trust icon={ShieldIcon} label="Quality Checked" />
          <Trust icon={HeadsetIcon} label="Customer Support Available" />
        </div>

        {/* Delivery info */}
        <div className="mt-4 rounded-2xl border border-charcoal/8 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">Delivery Information</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink">
            <li className="flex justify-between">
              <span>{siteConfig.delivery.insideDhakaLabel}</span>
              <span className="font-semibold">{formatBDT(siteConfig.delivery.insideDhaka)}</span>
            </li>
            <li className="flex justify-between">
              <span>{siteConfig.delivery.outsideDhakaLabel}</span>
              <span className="font-semibold">{formatBDT(siteConfig.delivery.outsideDhaka)}</span>
            </li>
          </ul>
          <p className="mt-2 text-xs text-clay">{siteConfig.delivery.note}</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-cream px-3 py-2">
            <CashIcon width={18} height={18} className="text-golddeep" />
            <span className="text-xs font-medium text-charcoal">Cash on Delivery — Pay when your order is delivered.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Trust({ icon: Icon, label }: { icon: typeof CashIcon; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon width={18} height={18} className="flex-shrink-0 text-golddeep" />
      <span className="text-xs font-medium text-charcoal">{label}</span>
    </div>
  );
}
