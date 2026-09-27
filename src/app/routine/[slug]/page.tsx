import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { routines, getRoutineBySlug } from "@/data/collections";
import { getProductBySlug } from "@/data/products";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return routines.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getRoutineBySlug(params.slug);
  if (!r) return { title: "Routine" };
  return { title: `${r.title} — Shop the Routine`, description: r.subtitle };
}

export default function RoutinePage({ params }: { params: { slug: string } }) {
  const routine = getRoutineBySlug(params.slug);
  if (!routine) notFound();

  const products = routine.productSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Routines" }, { label: routine.title }]} />

      <div className="relative mt-4 overflow-hidden rounded-3xl">
        <div className="relative aspect-[16/7] w-full sm:aspect-[21/7]">
          <Image src={routine.image} alt={routine.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-charcoal/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <span className="eyebrow text-warm/80">Shop by Routine</span>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-warm sm:text-5xl">{routine.title}</h1>
            <p className="mt-2 max-w-md text-sm text-warm/85">{routine.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
