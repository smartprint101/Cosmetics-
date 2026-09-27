"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { siteConfig, formatBDT } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CashIcon, CheckIcon } from "@/components/Icons";

const districts = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh",
  "Gazipur", "Narayanganj", "Cumilla", "Bogura", "Cox's Bazar", "Jashore", "Other",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [zone, setZone] = useState<"inside" | "outside">("inside");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", area: "", district: "Dhaka" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const delivery = zone === "inside" ? siteConfig.delivery.insideDhaka : siteConfig.delivery.outsideDhaka;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="container-lux py-16 text-center">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">Your cart is empty</h1>
        <p className="mt-2 text-sm text-clay">Add some products before checking out.</p>
        <Link href="/" className="btn-primary mt-6">Continue Shopping</Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "নাম দিন";
    if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) e.phone = "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)";
    if (!form.address.trim()) e.address = "সম্পূর্ণ ঠিকানা দিন";
    if (!form.area.trim()) e.area = "এলাকা দিন";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const orderId = `LUM-${Math.floor(10000 + Math.random() * 89999)}`;
    const order = {
      orderId,
      items,
      subtotal,
      delivery,
      total,
      zone,
      customer: form,
      date: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem("lumera-last-order", JSON.stringify(order));
    } catch { /* ignore */ }

    setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 700);
  };

  const inputCls = "w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-charcoal";

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mb-6 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Checkout</h1>

      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          {/* Customer info */}
          <section className="rounded-2xl border border-charcoal/8 bg-white p-5 sm:p-6">
            <h2 className="font-serif text-xl font-semibold text-charcoal">Customer Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="নাম" error={errors.name} full>
                <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="আপনার নাম" />
              </Field>
              <Field label="মোবাইল নম্বর" error={errors.phone}>
                <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" inputMode="numeric" />
              </Field>
              <Field label="এলাকা" error={errors.area}>
                <input className={inputCls} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="থানা / এলাকা" />
              </Field>
              <Field label="সম্পূর্ণ ঠিকানা" error={errors.address} full>
                <textarea className={`${inputCls} min-h-[80px] resize-none`} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="বাসা, রোড, এলাকা" />
              </Field>
              <Field label="জেলা" full>
                <select className={inputCls} value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })}>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          {/* Delivery */}
          <section className="rounded-2xl border border-charcoal/8 bg-white p-5 sm:p-6">
            <h2 className="font-serif text-xl font-semibold text-charcoal">Delivery</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ZoneOption active={zone === "inside"} onClick={() => setZone("inside")} title="Inside Dhaka" price={siteConfig.delivery.insideDhaka} />
              <ZoneOption active={zone === "outside"} onClick={() => setZone("outside")} title="Outside Dhaka" price={siteConfig.delivery.outsideDhaka} />
            </div>
            <p className="mt-3 text-xs text-clay">{siteConfig.delivery.note}</p>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-charcoal/8 bg-white p-5 sm:p-6">
            <h2 className="font-serif text-xl font-semibold text-charcoal">Payment</h2>
            <div className="mt-4 flex items-center gap-3 rounded-xl border-2 border-charcoal bg-cream p-4">
              <CashIcon className="text-golddeep" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-charcoal">Cash on Delivery</p>
                <p className="text-xs text-clay">Pay when your order is delivered.</p>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-warm">
                <CheckIcon width={12} height={12} />
              </span>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-charcoal/8 bg-cream p-5">
            <h2 className="font-serif text-xl font-semibold text-charcoal">Your Order</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-warm">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-charcoal">{item.name}</p>
                    <p className="text-[11px] text-clay">{[item.color, item.size].filter(Boolean).join(" · ")}</p>
                  </div>
                  <span className="text-xs font-semibold text-charcoal">{formatBDT(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <dl className="mt-4 space-y-2.5 border-t border-charcoal/10 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-ink">Subtotal</dt><dd className="font-medium text-charcoal">{formatBDT(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink">Delivery</dt><dd className="font-medium text-charcoal">{formatBDT(delivery)}</dd></div>
              <div className="flex justify-between border-t border-charcoal/10 pt-3 text-base"><dt className="font-semibold text-charcoal">Total</dt><dd className="font-semibold text-charcoal">{formatBDT(total)}</dd></div>
            </dl>

            <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full">
              {submitting ? "প্রসেসিং…" : "অর্ডার নিশ্চিত করুন"}
            </button>
            <p className="mt-3 text-center text-[11px] text-clay">
              This is a demo checkout. No real payment or order is processed.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, error, full, children }: { label: string; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-charcoal">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-rosedeep">{error}</p>}
    </div>
  );
}

function ZoneOption({ active, onClick, title, price }: { active: boolean; onClick: () => void; title: string; price: number }) {
  return (
    <button type="button" onClick={onClick} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${active ? "border-charcoal bg-cream" : "border-charcoal/20"}`}>
      <span className="text-sm font-medium text-charcoal">{title}</span>
      <span className="text-sm font-semibold text-charcoal">{formatBDT(price)}</span>
    </button>
  );
}
