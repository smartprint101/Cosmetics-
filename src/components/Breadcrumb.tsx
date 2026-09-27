import Link from "next/link";
import { ChevronRight } from "./Icons";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-clay">
      <Link href="/" className="hover:text-charcoal">
        Home
      </Link>
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1">
          <ChevronRight width={12} height={12} />
          {it.href ? (
            <Link href={it.href} className="hover:text-charcoal">
              {it.label}
            </Link>
          ) : (
            <span className="text-charcoal">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
