import type { Metadata } from "next";
import { siteConfig, formatBDT } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "Delivery Information" };

export default function DeliveryPage() {
  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Delivery" }]} />
      <h1 className="mb-3 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Delivery Information</h1>
      <p className="max-w-2xl text-sm text-ink/80">{siteConfig.delivery.note} আমরা সারা বাংলাদেশে home delivery দিয়ে থাকি।</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-charcoal/8 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-charcoal">Delivery Charges</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b border-charcoal/8 pb-3"><span className="text-ink">Inside Dhaka</span><span className="font-semibold text-charcoal">{formatBDT(siteConfig.delivery.insideDhaka)}</span></li>
            <li className="flex justify-between"><span className="text-ink">Outside Dhaka</span><span className="font-semibold text-charcoal">{formatBDT(siteConfig.delivery.outsideDhaka)}</span></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-charcoal/8 bg-cream p-6">
          <h2 className="font-serif text-xl font-semibold text-charcoal">Delivery Time</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            <li>• Inside Dhaka: 1–2 working days</li>
            <li>• Outside Dhaka: 2–4 working days</li>
            <li>• Cash on Delivery available everywhere</li>
            <li>• You will be contacted to confirm your order</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 text-xs text-clay">Demo store — delivery charges and timings are illustrative and configurable.</p>
    </div>
  );
}
