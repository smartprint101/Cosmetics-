import Image from "next/image";
import Link from "next/link";
import { routines } from "@/data/collections";
import { SectionHeading } from "@/components/SectionHeading";

export function RoutineSection() {
  return (
    <section className="container-lux py-14 sm:py-16">
      <SectionHeading
        eyebrow="Discover"
        title="Shop by Routine"
        subtitle="Not sure where to start? Shop for the moment, not just the category."
      />
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {routines.map((r) => (
          <Link
            key={r.slug}
            href={`/routine/${r.slug}`}
            className="group relative aspect-[3/4] w-[150px] flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-cream sm:w-auto"
          >
            <Image src={r.image} alt={r.title} fill sizes="(max-width:640px) 150px, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3.5">
              <h3 className="font-serif text-base font-semibold leading-tight text-warm">{r.title}</h3>
              <p className="mt-0.5 text-[10px] leading-snug text-warm/80">{r.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
