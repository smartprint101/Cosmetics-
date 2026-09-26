import type { Metadata } from "next";
import { getSaleProducts } from "@/data/products";
import { ProductListing } from "@/components/ProductListing";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Sale — Up to 30% Off Beauty Essentials",
  description: "Shop discounted skincare, makeup, hair care and more at LUMÉRA. Limited-time beauty offers.",
};

export default function SalePage() {
  const products = getSaleProducts();

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Sale" }]} />
      <header className="mb-8 mt-4 overflow-hidden rounded-3xl bg-charcoal px-6 py-10 text-center sm:py-14">
        <span className="rounded-full bg-gold/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-charcoal">
          Beauty Essentials
        </span>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-warm sm:text-5xl">
          Up to 30% Off
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-warm/80">
          Refresh your routine with our best-loved products at special prices — while stocks last.
        </p>
      </header>

      <ProductListing products={products} />
    </div>
  );
}
