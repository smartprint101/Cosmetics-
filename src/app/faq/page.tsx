import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  { q: "কীভাবে অর্ডার করব?", a: "পছন্দের product select করে Add to Cart অথবা Order Now-এ ক্লিক করুন, তারপর checkout-এ তথ্য দিয়ে অর্ডার নিশ্চিত করুন।" },
  { q: "Payment কীভাবে করব?", a: "আমরা Cash on Delivery (COD) সাপোর্ট করি — product হাতে পেয়ে টাকা পরিশোধ করবেন।" },
  { q: "Delivery charge কত?", a: "Inside Dhaka ৳70 এবং Outside Dhaka ৳130। সারা বাংলাদেশে ডেলিভারি করা হয়।" },
  { q: "Product কি authentic?", a: "এটি একটি demo website। সব product fictional এবং শুধুমাত্র প্রদর্শনের জন্য।" },
  { q: "কতদিনে delivery পাব?", a: "Inside Dhaka 1–2 দিন এবং Outside Dhaka 2–4 কর্মদিবসের মধ্যে।" },
];

export default function FaqPage() {
  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "FAQ" }]} />
      <h1 className="mb-6 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Frequently Asked Questions</h1>
      <div className="max-w-2xl space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-charcoal/8 bg-white p-5">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-charcoal">
              {f.q}
              <span className="ml-4 text-clay transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-ink/85">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
