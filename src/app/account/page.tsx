import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { UserIcon, BagIcon, HeartIcon, HeadsetIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  const tiles = [
    { icon: BagIcon, title: "My Orders", desc: "Track and view your orders", href: "/cart" },
    { icon: HeartIcon, title: "Wishlist", desc: "Your saved products", href: "/wishlist" },
    { icon: HeadsetIcon, title: "Support", desc: "Get help with your order", href: "/contact" },
  ];
  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Account" }]} />
      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-charcoal">
          <UserIcon width={26} height={26} />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">Welcome to LUMÉRA</h1>
          <p className="text-sm text-clay">Sign in is not required in this demo store.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.title} href={t.href} className="rounded-2xl border border-charcoal/8 bg-white p-5 card-hover">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-golddeep">
              <t.icon width={22} height={22} />
            </div>
            <h2 className="mt-3 font-serif text-lg font-semibold text-charcoal">{t.title}</h2>
            <p className="mt-1 text-sm text-clay">{t.desc}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 rounded-2xl border border-dashed border-charcoal/20 p-5 text-center text-sm text-clay">
        This is a demonstration website. Account and authentication features are not part of the demo.
      </p>
    </div>
  );
}
