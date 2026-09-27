import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory } from "@/config/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductListing } from "@/components/ProductListing";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Category" };
  return {
    title: `${category.name} — Shop Online`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const showSkin = category.slug === "skincare";

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: category.name }]} />
      <header className="mb-8 mt-4">
        <h1 className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">{category.name}</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/80">{category.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {category.subcategories.map((s) => (
            <span key={s.slug} className="chip">
              {s.name}
            </span>
          ))}
        </div>
      </header>

      <ProductListing products={products} showSkinType={showSkin} />
    </div>
  );
}
