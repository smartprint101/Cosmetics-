"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

export function AddBundleButton({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const addAll = () => {
    products.forEach((p) =>
      addItem(p, {
        size: p.sizeVariants?.[0]?.label ?? p.size,
        color: p.colorVariants?.[0]?.label,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button onClick={addAll} className="btn-primary w-full sm:w-auto">
        {added ? "Added to Cart ✓" : "Add Bundle to Cart"}
      </button>
      <button
        onClick={() => {
          addAll();
          router.push("/checkout");
        }}
        className="btn-gold w-full sm:w-auto"
      >
        Order Bundle Now
      </button>
    </div>
  );
}
