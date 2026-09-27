import Image from "next/image";
import Link from "next/link";
import { resolvedBundles } from "@/data/collections";
import { formatBDT } from "@/config/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function BundleSection() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Curated Sets"
          title="Build Your Beauty Routine"
          subtitle="Thoughtfully paired essentials at a special bundle price."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {resolvedBundles.map((b, i) => {
            const saving = b.originalTotal - b.bundlePrice;
            return (
              <Reveal key={b.id} delay={i * 90}>
                <Link
                  href={`/bundle/${b.slug}`}
                  className="group grid grid-cols-[130px_1fr] overflow-hidden rounded-2xl border border-charcoal/8 bg-white card-hover sm:grid-cols-[180px_1fr]"
                >
                  <div className="relative bg-cream">
                    <Image src={b.image} alt={b.name} fill sizes="180px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col p-4 sm:p-5">
                    <h3 className="font-serif text-xl font-semibold text-charcoal">{b.name}</h3>
                    <p className="mt-1 text-xs text-ink/75">{b.description}</p>
                    <ul className="mt-3 space-y-1">
                      {b.products.map((p) => (
                        <li key={p.id} className="flex items-center gap-2 text-xs text-ink">
                          <span className="h-1 w-1 rounded-full bg-gold" />
                          {p.name}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div>
                        <p className="text-xs text-clay line-through">{formatBDT(b.originalTotal)}</p>
                        <p className="text-lg font-semibold text-charcoal">{formatBDT(b.bundlePrice)}</p>
                      </div>
                      {saving > 0 && (
                        <span className="rounded-full bg-rose/10 px-2.5 py-1 text-[11px] font-semibold text-rosedeep">
                          Save {formatBDT(saving)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
