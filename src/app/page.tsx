import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { OfferBanner } from "@/components/home/OfferBanner";
import { BundleSection } from "@/components/home/BundleSection";
import { RoutineSection } from "@/components/home/RoutineSection";
import { Testimonials } from "@/components/home/Testimonials";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductGrid } from "@/components/ProductGrid";
import { getBestSellers, getNewArrivals } from "@/data/products";

export default function HomePage() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />

      <section className="container-lux pb-4">
        <SectionHeading
          eyebrow="Most Loved"
          title="Best Sellers"
          subtitle="The products our customers reach for again and again."
          align="left"
          link={{ href: "/category/skincare", label: "View all" }}
        />
        <ProductGrid products={bestSellers} />
      </section>

      <OfferBanner />

      <RoutineSection />

      <BundleSection />

      {newArrivals.length > 0 && (
        <section className="container-lux py-14 sm:py-16">
          <SectionHeading
            eyebrow="Just In"
            title="New Arrivals"
            align="left"
            link={{ href: "/category/skincare", label: "Shop new" }}
          />
          <ProductGrid products={newArrivals} />
        </section>
      )}

      <Testimonials />
    </>
  );
}
