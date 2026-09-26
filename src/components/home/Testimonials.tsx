import { SectionHeading } from "@/components/SectionHeading";
import { StarRating } from "@/components/StarRating";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    name: "Nusrat J.",
    location: "Dhaka",
    rating: 5,
    text: "Packaging আর product presentation দুটোই অনেক সুন্দর লেগেছে। Serum ব্যবহার করে skin অনেক fresh লাগছে।",
  },
  {
    name: "Tania R.",
    location: "Chattogram",
    rating: 5,
    text: "অর্ডার করার পর খুব দ্রুত delivery পেয়েছি। Cash on delivery থাকায় order করা অনেক সহজ ছিল।",
  },
  {
    name: "Farhana A.",
    location: "Sylhet",
    rating: 4,
    text: "দাম অনুযায়ী quality অনেক ভালো। Website থেকে order করা একদম easy আর smooth ছিল।",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="container-lux">
        <SectionHeading eyebrow="Loved By Customers" title="What Our Customers Say" />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-charcoal/8 bg-white p-6">
                <StarRating rating={t.rating} size={16} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nude/40 font-serif text-base font-semibold text-charcoal">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                    <p className="text-xs text-clay">{t.location}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-clay">
          Demo reviews shown for illustration only — not verified customer reviews.
        </p>
      </div>
    </section>
  );
}
