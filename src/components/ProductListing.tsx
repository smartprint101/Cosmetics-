"use client";

import { useMemo, useState } from "react";
import type { Product, SkinType } from "@/lib/types";
import { discountPercent } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { FilterIcon, CloseIcon, ChevronDown } from "./Icons";

type SortKey = "featured" | "new" | "price-asc" | "price-desc" | "best";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "new", label: "New Arrivals" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "best", label: "Best Selling" },
];

const priceRanges = [
  { label: "Under ৳500", min: 0, max: 499 },
  { label: "৳500 – ৳1,000", min: 500, max: 1000 },
  { label: "৳1,000 – ৳2,000", min: 1000, max: 2000 },
  { label: "৳2,000+", min: 2000, max: Infinity },
];

const skinTypes: SkinType[] = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];

export function ProductListing({
  products,
  showSkinType = true,
}: {
  products: Product[];
  showSkinType?: boolean;
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selPrice, setSelPrice] = useState<number[]>([]);
  const [selSkin, setSelSkin] = useState<string[]>([]);
  const [selType, setSelType] = useState<string[]>([]);
  const [selBrand, setSelBrand] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const productTypes = useMemo(
    () => Array.from(new Set(products.map((p) => p.subcategoryName))).sort(),
    [products]
  );
  const collections = useMemo(
    () => Array.from(new Set(products.map((p) => p.collection).filter(Boolean) as string[])).sort(),
    [products]
  );

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  const togglePrice = (idx: number) =>
    setSelPrice((p) => (p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx]));

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (inStockOnly && !p.inStock) return false;
      if (minRating && p.rating < minRating) return false;
      if (selType.length && !selType.includes(p.subcategoryName)) return false;
      if (selBrand.length && !(p.collection && selBrand.includes(p.collection))) return false;
      if (selSkin.length && !(p.skinType && p.skinType.some((s) => selSkin.includes(s)))) return false;
      if (selPrice.length) {
        const ok = selPrice.some((i) => p.price >= priceRanges[i].min && p.price <= priceRanges[i].max);
        if (!ok) return false;
      }
      return true;
    });

    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "new":
        list.sort((a, b) => Number(b.newArrival ?? false) - Number(a.newArrival ?? false));
        break;
      case "best":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list.sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.rating - a.rating
        );
    }
    return list;
  }, [products, sort, selPrice, selSkin, selType, selBrand, inStockOnly, minRating]);

  const activeCount =
    selPrice.length + selSkin.length + selType.length + selBrand.length + (inStockOnly ? 1 : 0) + (minRating ? 1 : 0);

  const clearAll = () => {
    setSelPrice([]);
    setSelSkin([]);
    setSelType([]);
    setSelBrand([]);
    setInStockOnly(false);
    setMinRating(0);
  };

  const Filters = () => (
    <div className="space-y-6">
      <FilterGroup title="Product Type">
        {productTypes.map((t) => (
          <Check key={t} label={t} checked={selType.includes(t)} onChange={() => toggle(selType, setSelType, t)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {priceRanges.map((r, i) => (
          <Check key={r.label} label={r.label} checked={selPrice.includes(i)} onChange={() => togglePrice(i)} />
        ))}
      </FilterGroup>

      {showSkinType && (
        <FilterGroup title="Skin Type">
          {skinTypes.map((s) => (
            <Check key={s} label={s} checked={selSkin.includes(s)} onChange={() => toggle(selSkin, setSelSkin, s)} />
          ))}
        </FilterGroup>
      )}

      {collections.length > 0 && (
        <FilterGroup title="Collection">
          {collections.map((c) => (
            <Check key={c} label={c} checked={selBrand.includes(c)} onChange={() => toggle(selBrand, setSelBrand, c)} />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Rating">
        {[4, 4.5].map((r) => (
          <Check key={r} label={`${r}★ & up`} checked={minRating === r} onChange={() => setMinRating(minRating === r ? 0 : r)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        <Check label="In stock only" checked={inStockOnly} onChange={() => setInStockOnly((v) => !v)} />
      </FilterGroup>

      {activeCount > 0 && (
        <button onClick={clearAll} className="text-xs font-medium uppercase tracking-widest text-rosedeep hover:underline">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h3 className="mb-4 font-serif text-lg font-semibold text-charcoal">Filters</h3>
          <Filters />
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 rounded-full border border-charcoal/20 px-4 py-2 text-xs font-medium uppercase tracking-wide text-charcoal lg:hidden"
          >
            <FilterIcon width={16} height={16} />
            Filters {activeCount > 0 && <span className="ml-0.5 rounded-full bg-charcoal px-1.5 text-[10px] text-warm">{activeCount}</span>}
          </button>
          <p className="hidden text-sm text-clay lg:block">{filtered.length} products</p>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none rounded-full border border-charcoal/20 bg-white py-2 pl-4 pr-9 text-xs font-medium text-charcoal outline-none"
              aria-label="Sort products"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown width={15} height={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-clay" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-charcoal/20 py-16 text-center">
            <p className="text-sm text-clay">No products match your filters.</p>
            <button onClick={clearAll} className="mt-3 btn-outline !py-2 !text-[10px]">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[65] lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-charcoal/40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-warm p-5 transition-transform duration-300 ${
            drawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-charcoal">Filters</h3>
            <button onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="text-charcoal">
              <CloseIcon />
            </button>
          </div>
          <Filters />
          <button onClick={() => setDrawerOpen(false)} className="btn-primary mt-6 w-full">
            Show {filtered.length} products
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
      <span
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${
          checked ? "border-charcoal bg-charcoal text-warm" : "border-charcoal/30 bg-white"
        }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}
