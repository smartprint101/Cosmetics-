import Image from "next/image";
import Link from "next/link";

export function OfferBanner() {
  return (
    <section className="container-lux py-6">
      <div className="relative overflow-hidden rounded-3xl bg-charcoal">
        <Image
          src="/scenes/offer.jpg"
          alt="Beauty essentials on sale"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="relative flex flex-col items-start gap-4 px-6 py-12 sm:px-12 sm:py-16 lg:max-w-xl">
          <span className="rounded-full bg-gold/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-charcoal">
            Limited Time
          </span>
          <h2 className="font-serif text-3xl font-semibold text-warm sm:text-4xl lg:text-5xl">
            Beauty Essentials
            <span className="block text-gold">Up to 30% Off</span>
          </h2>
          <p className="max-w-md text-sm text-warm/85">
            Refresh your routine with our best-loved skincare, makeup and hair care — now at special prices.
          </p>
          <Link href="/sale" className="btn-gold mt-1">
            Shop Sale
          </Link>
        </div>
      </div>
    </section>
  );
}
