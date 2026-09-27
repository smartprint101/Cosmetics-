"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { siteConfig, formatBDT } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlusIcon, MinusIcon, TrashIcon, BagIcon } from "@/components/Icons";

export default function CartPage() {
  const { items, setQty, removeItem, subtotal } = useCart();
  const [zone, setZone] = useState<"inside" | "outside">("inside");

  const delivery =
    items.length === 0 ? 0 : zone === "inside" ? siteConfig.delivery.insideDhaka : siteConfig.delivery.outsideDhaka;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="container-lux py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-clay">
          <BagIcon width={28} height={28} />
        </div>
        <h1 className="mt-5 font-serif text-2xl font-semibold text-charcoal">Your cart is empty</h1>
        <p className="mt-2 text-sm text-clay">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/" className="btn-primary mt-6">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Cart" }]} />
      <h1 className="mb-6 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-2xl border border-charcoal/8 bg-white p-3 sm:gap-4 sm:p-4">
              <Link href={`/product/${item.slug}`} className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-cream sm:h-28 sm:w-24">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link href={`/product/${item.slug}`} className="text-sm font-medium text-charcoal hover:text-rosedeep sm:text-base">
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-clay">
                      {[item.color, item.size].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.id)} aria-label="Remove" className="h-fit p-1 text-clay hover:text-rosedeep">
                    <TrashIcon width={18} height={18} />
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between pt-2">
                  <div className="flex items-center rounded-full border border-charcoal/20">
                    <button onClick={() => setQty(item.id, item.quantity - 1)} aria-label="Decrease" className="p-2 text-charcoal disabled:opacity-30" disabled={item.quantity <= 1}>
                      <MinusIcon width={14} height={14} />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => setQty(item.id, item.quantity + 1)} aria-label="Increase" className="p-2 text-charcoal">
                      <PlusIcon width={14} height={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-charcoal">{formatBDT(item.price * item.quantity)}</p>
                    {item.originalPrice > item.price && (
                      <p className="text-xs text-clay line-through">{formatBDT(item.originalPrice * item.quantity)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link href="/" className="inline-block text-xs font-medium uppercase tracking-widest text-rosedeep hover:underline">
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-charcoal/8 bg-cream p-5">
            <h2 className="font-serif text-xl font-semibold text-charcoal">Order Summary</h2>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">Delivery Zone</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setZone("inside")}
                  className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${zone === "inside" ? "border-charcoal bg-white" : "border-charcoal/20"}`}
                >
                  <span className="block text-xs font-medium text-charcoal">Inside Dhaka</span>
                  <span className="text-xs text-clay">{formatBDT(siteConfig.delivery.insideDhaka)}</span>
                </button>
                <button
                  onClick={() => setZone("outside")}
                  className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${zone === "outside" ? "border-charcoal bg-white" : "border-charcoal/20"}`}
                >
                  <span className="block text-xs font-medium text-charcoal">Outside Dhaka</span>
                  <span className="text-xs text-clay">{formatBDT(siteConfig.delivery.outsideDhaka)}</span>
                </button>
              </div>
            </div>

            <dl className="mt-5 space-y-2.5 border-t border-charcoal/10 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink">Subtotal</dt>
                <dd className="font-medium text-charcoal">{formatBDT(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink">Delivery Charge</dt>
                <dd className="font-medium text-charcoal">{formatBDT(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-charcoal/10 pt-3 text-base">
                <dt className="font-semibold text-charcoal">Total</dt>
                <dd className="font-semibold text-charcoal">{formatBDT(total)}</dd>
              </div>
            </dl>

            <Link href="/checkout" className="btn-primary mt-5 w-full">
              Proceed to Checkout
            </Link>
            <p className="mt-3 text-center text-xs text-clay">Cash on Delivery available across Bangladesh.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
