import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelated, products } from "@/data/products";
import { getCategory } from "@/config/categories";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StarRating } from "@/components/StarRating";
import { SectionHeading } from "@/components/SectionHeading";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  return {
    title: `${product.name} — ${product.subcategoryName}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | LUMÉRA`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelated(product);

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb
        items={[
          { label: category?.name ?? "Shop", href: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6">
        <ProductDetail product={product} />
      </div>

      {/* Details sections */}
      <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">Product Description</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{product.fullDescription}</p>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">Key Benefits</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 rounded-xl border border-charcoal/8 bg-white p-3.5 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cream text-golddeep">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5L20 7" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-semibold text-charcoal">Key Ingredients</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.ingredients.map((ing) => (
                  <div key={ing.name} className="rounded-xl border border-charcoal/8 bg-cream p-4">
                    <p className="text-sm font-semibold text-charcoal">{ing.name}</p>
                    <p className="mt-0.5 text-xs text-ink/75">{ing.note}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* How to use */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">How to Use</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.howToUse.map((step) => (
                <div key={step.step} className="flex gap-3 rounded-xl border border-charcoal/8 bg-white p-4">
                  <span className="font-serif text-2xl font-semibold text-nude">{step.step}</span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{step.title}</p>
                    <p className="mt-0.5 text-xs text-ink/75">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={16} />
                <span className="text-sm text-clay">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {product.reviews.map((r, i) => (
                <figure key={i} className="rounded-xl border border-charcoal/8 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nude/40 font-serif text-sm font-semibold text-charcoal">
                        {r.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{r.name}</p>
                        <p className="text-[11px] text-clay">{r.date}</p>
                      </div>
                    </div>
                    <StarRating rating={r.rating} size={13} />
                  </div>
                  <p className="mt-2.5 text-sm text-ink/85">{r.text}</p>
                </figure>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-clay">Demo reviews for illustration only — not verified customer reviews.</p>
          </section>
        </div>

        {/* Sidebar: quick facts */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-charcoal/8 bg-cream p-5">
            <h3 className="font-serif text-lg font-semibold text-charcoal">Product Details</h3>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="SKU" value={product.sku} />
              <Row label="Brand" value={product.brand} />
              {product.collection && <Row label="Collection" value={product.collection} />}
              <Row label="Category" value={category?.name ?? ""} />
              {product.size && <Row label="Size / Volume" value={product.size} />}
              {product.skinType && <Row label="Skin Type" value={product.skinType.join(", ")} />}
              {product.hairType && <Row label="Hair Type" value={product.hairType.join(", ")} />}
              <Row label="Suitable For" value={product.suitableFor.join(", ")} />
              <Row label="Availability" value={product.inStock ? "In Stock" : "Out of Stock"} />
            </dl>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading eyebrow="You May Also Like" title="Related Products" align="left" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-charcoal/8 pb-2 last:border-0">
      <dt className="flex-shrink-0 text-clay">{label}</dt>
      <dd className="text-right font-medium text-charcoal">{value}</dd>
    </div>
  );
}
