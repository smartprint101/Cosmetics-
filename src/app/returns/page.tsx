import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "Return Policy" };

const points = [
  "Products can be returned within 3 days of delivery if unused and in original packaging.",
  "Please check your product at the time of delivery.",
  "Damaged or wrong products will be replaced at no extra cost.",
  "For any return request, contact us via WhatsApp with your order ID.",
];

export default function ReturnsPage() {
  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Return Policy" }]} />
      <h1 className="mb-3 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Return Policy</h1>
      <p className="max-w-2xl text-sm text-ink/80">আমরা চাই আপনি আপনার কেনাকাটায় সম্পূর্ণ সন্তুষ্ট থাকুন।</p>
      <ul className="mt-6 max-w-2xl space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3 rounded-xl border border-charcoal/8 bg-white p-4 text-sm text-ink">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-clay">This is a demonstration policy for a demo store.</p>
    </div>
  );
}
