import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

export function ProductGrid({ products, reveal = true }: { products: Product[]; reveal?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) =>
        reveal ? (
          <Reveal key={p.id} delay={(i % 4) * 60}>
            <ProductCard product={p} />
          </Reveal>
        ) : (
          <ProductCard key={p.id} product={p} />
        )
      )}
    </div>
  );
}
