import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-lux grid items-center gap-6 py-6 sm:gap-8 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:py-20">
        {/* Text */}
        <div className="animate-fadeUp order-2 text-center lg:order-1 lg:text-left">
          <span className="eyebrow">Beauty, Made Effortless.</span>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
            LUMÉRA
            <span className="mt-2 block font-serif text-2xl font-normal italic text-rosedeep sm:text-3xl lg:text-4xl">
              Your Everyday Beauty Ritual
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/85 lg:mx-0">
            Discover skincare, makeup and beauty essentials curated for your everyday routine — quality
            checked and delivered across Bangladesh.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/category/skincare" className="btn-primary w-full sm:w-auto">
              Shop Skincare
            </Link>
            <Link href="/category/makeup" className="btn-outline w-full sm:w-auto">
              Explore Beauty
            </Link>
          </div>
          <div className="mt-7 flex items-center justify-center gap-6 text-xs text-clay lg:justify-start">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Cash on Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Delivery Across BD
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Quality Checked
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="animate-fadeIn relative order-1 mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl shadow-lift sm:aspect-[3/2] sm:max-w-xl lg:order-2 lg:ml-auto lg:mr-0 lg:aspect-[4/5] lg:max-w-md">
          <Image
            src="/scenes/hero.jpg"
            alt="LUMÉRA premium beauty essentials"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-widest text-clay">New Season</p>
            <p className="font-serif text-lg font-semibold text-charcoal">Glow Essentials</p>
          </div>
        </div>
      </div>
    </section>
  );
}
