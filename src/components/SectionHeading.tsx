import Link from "next/link";
import { ChevronRight } from "./Icons";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  link,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  link?: { href: string; label: string };
}) {
  return (
    <div
      className={`mb-7 flex flex-col gap-1 sm:mb-9 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${link ? "sm:flex-row sm:items-end sm:justify-between" : ""}`}
    >
      <div className={align === "center" ? "flex flex-col items-center" : ""}>
        {eyebrow && <span className="eyebrow mb-2">{eyebrow}</span>}
        <h2 className="text-3xl font-semibold text-charcoal sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className={`mt-2 max-w-xl text-sm text-ink/80 ${align === "center" ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group mt-1 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-rosedeep hover:text-charcoal"
        >
          {link.label}
          <ChevronRight width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
