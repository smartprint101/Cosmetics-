"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchProducts } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SearchIcon } from "@/components/Icons";

const suggestions = ["Vitamin C", "Serum", "Lipstick", "Sunscreen", "Moisturizer", "Shampoo", "Perfume"];

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);

  const results = searchProducts(q);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Search" }]} />
      <h1 className="mb-5 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Search</h1>

      <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-charcoal/20 bg-white px-4 py-2.5">
        <SearchIcon className="text-clay" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, ingredients…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-clay"
          autoFocus
        />
        <button type="submit" className="btn-primary !py-2 !px-5 !text-[10px]">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQ(s);
              router.replace(`/search?q=${encodeURIComponent(s)}`);
            }}
            className="chip hover:border-charcoal/40"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {q.trim() === "" ? (
          <p className="text-sm text-clay">Start typing to find your beauty essentials.</p>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-charcoal/20 py-16 text-center">
            <p className="text-sm text-clay">No products found for “{q}”.</p>
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm text-clay">
              {results.length} result{results.length > 1 ? "s" : ""} for “{q}”
            </p>
            <ProductGrid products={results} reveal={false} />
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-lux py-20 text-center text-clay">Loading…</div>}>
      <SearchInner />
    </Suspense>
  );
}
