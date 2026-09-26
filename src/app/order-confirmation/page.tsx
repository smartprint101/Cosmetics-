"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, formatBDT } from "@/config/site";
import { CheckIcon, TruckIcon, CashIcon } from "@/components/Icons";

interface Order {
  orderId: string;
  total: number;
  delivery: number;
  subtotal: number;
  zone: "inside" | "outside";
  customer: { name: string; phone: string; address: string; area: string; district: string };
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lumera-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  if (loaded && !order) {
    return (
      <div className="container-lux py-16 text-center">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">কোনো অর্ডার পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-clay">Please place an order first.</p>
        <Link href="/" className="btn-primary mt-6">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-lux py-12 sm:py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 animate-fadeUp items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckIcon width={32} height={32} />
        </div>
        <h1 className="mt-5 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
          অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
        </h1>
        {order && (
          <p className="mt-3 text-lg font-semibold tracking-wide text-rosedeep">Order ID: #{order.orderId}</p>
        )}
        <p className="mt-2 text-sm text-ink/80">
          আপনার অর্ডারের জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
        </p>
      </div>

      {order && (
        <div className="mx-auto mt-8 max-w-lg space-y-4">
          <div className="rounded-2xl border border-charcoal/8 bg-white p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">Delivery Details</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="নাম" value={order.customer.name} />
              <Row label="মোবাইল" value={order.customer.phone} />
              <Row label="ঠিকানা" value={`${order.customer.address}, ${order.customer.area}, ${order.customer.district}`} />
              <Row label="ডেলিভারি" value={order.zone === "inside" ? "Inside Dhaka" : "Outside Dhaka"} />
            </dl>
          </div>

          <div className="rounded-2xl border border-charcoal/8 bg-cream p-5">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ink">Subtotal</dt><dd className="font-medium text-charcoal">{formatBDT(order.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink">Delivery</dt><dd className="font-medium text-charcoal">{formatBDT(order.delivery)}</dd></div>
              <div className="flex justify-between border-t border-charcoal/10 pt-2 text-base"><dt className="font-semibold text-charcoal">Total (COD)</dt><dd className="font-semibold text-charcoal">{formatBDT(order.total)}</dd></div>
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-charcoal/8 bg-white p-3">
              <CashIcon width={20} height={20} className="text-golddeep" />
              <span className="text-xs font-medium text-charcoal">Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-charcoal/8 bg-white p-3">
              <TruckIcon width={20} height={20} className="text-golddeep" />
              <span className="text-xs font-medium text-charcoal">Delivery Across BD</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-clay">
            এটি একটি Demo order confirmation। কোনো real order প্রসেস হয়নি।
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn-primary w-full">Continue Shopping</Link>
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
              Need Help? WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="flex-shrink-0 text-clay">{label}</dt>
      <dd className="text-right font-medium text-charcoal">{value}</dd>
    </div>
  );
}
