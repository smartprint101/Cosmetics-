import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { bundles, getBundleBySlug } from "@/data/collections";
import { formatBDT } from "@/config/site";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AddBundleButton } from "@/components/AddBundleButton";
import { SectionHeading } from "@/components/SectionHeading";

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBundleBySlug(params.slug);
  if (!b) return { title: "Bundle" };
  return { title: `${b.name} — Beauty Bundle`, description: b.description };
}

export default function BundlePage({ params }: { params: { slug: string } }) {
  const bundle = getBundleBySlug(params.slug);
  if (!bundle) notFound();

  const saving = bundle.originalTotal - bundle.bundlePrice;

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Bundles" }, { label: bundle.name }]} />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream">
          <Image src={bundle.image} alt={bundle.name} fill priority sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
        </div>
        <div>
          <span className="eyebrow">Curated Set</span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">{bundle.name}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{bundle.description}</p>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-semibold text-charcoal">{formatBDT(bundle.bundlePrice)}</span>
            <span className="text-base text-clay line-through">{formatBDT(bundle.originalTotal)}</span>
            {saving > 0 && (
              <span className="rounded-full bg-rose/10 px-2.5 py-1 text-xs font-semibold text-rosedeep">Save {formatBDT(saving)}</span>
            )}
          </div>

          <ul className="mt-5 space-y-2">
            {bundle.products.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-xl border border-charcoal/8 bg-white px-4 py-3 text-sm">
                <span className="text-charcoal">{p.name}</span>
                <span className="text-clay">{formatBDT(p.price)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <AddBundleButton products={bundle.products} />
          </div>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeading eyebrow="Inside The Kit" title="What's Included" align="left" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {bundle.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
