import { CashIcon, TruckIcon, ShieldIcon, HeadsetIcon } from "@/components/Icons";

const items = [
  { icon: CashIcon, title: "Cash on Delivery", sub: "সারা বাংলাদেশে" },
  { icon: TruckIcon, title: "Fast Delivery", sub: "দেশজুড়ে Home Delivery" },
  { icon: ShieldIcon, title: "Quality Checked", sub: "পণ্য পাঠানোর আগে যাচাই" },
  { icon: HeadsetIcon, title: "Customer Support", sub: "সহজে যোগাযোগ করুন" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-charcoal/8 bg-warm">
      <div className="container-lux grid grid-cols-2 gap-x-4 gap-y-6 py-7 md:grid-cols-4 md:py-8">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-cream text-golddeep">
              <it.icon width={22} height={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">{it.title}</p>
              <p className="text-xs text-clay">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
