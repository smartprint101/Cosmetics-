import Image from "next/image";
import Link from "next/link";
import { categories } from "@/config/categories";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function CategoryShowcase() {
  return (
    <section className="container-lux py-14 sm:py-16">
      <SectionHeading eyebrow="Explore" title="Shop by Category" subtitle="Find exactly what your routine needs." />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 70}>
            <Link
              href={`/category/${c.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-cream"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-serif text-lg font-semibold text-warm sm:text-xl">{c.name}</h3>
                <p className="mt-0.5 text-[11px] uppercase tracking-widest text-warm/80">
                  {c.subcategories.length} collections
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
