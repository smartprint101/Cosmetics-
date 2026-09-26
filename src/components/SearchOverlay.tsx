"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchProducts } from "@/data/products";
import { formatBDT } from "@/config/site";
import { CloseIcon, SearchIcon } from "./Icons";

const suggestions = ["Vitamin C", "Serum", "Lipstick", "Sunscreen", "Moisturizer", "Shampoo", "Perfume"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-charcoal/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="animate-fadeUp bg-warm shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container-lux py-5">
          <div className="flex items-center gap-3">
            <SearchIcon className="text-clay" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products, ingredients…"
              className="flex-1 bg-transparent py-2 text-base outline-none placeholder:text-clay"
            />
            <button onClick={onClose} aria-label="Close search" className="text-charcoal">
              <CloseIcon />
            </button>
          </div>

          <div className="mt-4">
            {!q && (
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow mr-1 self-center">Popular</span>
                {suggestions.map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="chip hover:border-charcoal/40">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {q && results.length === 0 && (
              <p className="py-6 text-sm text-clay">No products found for “{q}”.</p>
            )}

            {results.length > 0 && (
              <div className="mt-2 grid gap-1.5">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-cream"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-cream">
                      <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-charcoal">{p.name}</p>
                      <p className="text-xs text-clay">{p.subcategoryName}</p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal">{formatBDT(p.price)}</span>
                  </Link>
                ))}
                <Link
                  href={`/search?q=${encodeURIComponent(q)}`}
                  onClick={onClose}
                  className="mt-1 text-center text-xs font-medium uppercase tracking-widest text-rosedeep hover:underline"
                >
                  View all results
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
