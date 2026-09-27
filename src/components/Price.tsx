import { formatBDT } from "@/config/site";

export function Price({
  price,
  originalPrice,
  size = "md",
}: {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
}) {
  const hasDiscount = originalPrice && originalPrice > price;
  const cur =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  const old =
    size === "lg" ? "text-base" : size === "sm" ? "text-xs" : "text-sm";
  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-semibold text-charcoal ${cur}`}>{formatBDT(price)}</span>
      {hasDiscount && (
        <span className={`text-clay line-through ${old}`}>{formatBDT(originalPrice!)}</span>
      )}
    </div>
  );
}
