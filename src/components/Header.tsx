"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { headerCategories, categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { SearchOverlay } from "./SearchOverlay";
import {
  SearchIcon,
  HeartIcon,
  UserIcon,
  BagIcon,
  MenuIcon,
  CloseIcon,
  ChevronRight,
} from "./Icons";

const navLinks = [
  { name: "Home", href: "/" },
  ...headerCategories.map((c) => ({ name: c.name, href: `/category/${c.slug}` })),
  { name: "Sale", href: "/sale", sale: true },
];

export function Header() {
  const { count, wishlist } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header className={`sticky top-0 z-50 border-b border-charcoal/8 bg-warm/95 backdrop-blur transition-shadow ${scrolled ? "shadow-card" : ""}`}>
      <div className="container-lux">
        <div className="flex h-16 items-center justify-between gap-3 lg:h-[70px]">
          {/* Left: mobile menu / desktop nav */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-ml-2 p-2 text-charcoal"
            >
              <MenuIcon width={22} height={22} />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 lg:flex-1">
            <span className="font-serif text-2xl font-semibold tracking-[0.22em] text-charcoal lg:text-[26px]">
              {siteConfig.brand.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex lg:flex-[2] lg:justify-center">
            {navLinks.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.name}
                  href={l.href}
                  className={`relative text-[13px] font-medium tracking-wide transition-colors ${
                    (l as { sale?: boolean }).sale ? "text-rosedeep" : "text-ink hover:text-charcoal"
                  } ${active ? "after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:bg-charcoal" : ""}`}
                >
                  {l.name}
                </Link>
              );
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-2 lg:flex-1 lg:justify-end">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-2 text-charcoal hover:text-rosedeep">
              <SearchIcon width={20} height={20} />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="relative hidden p-2 text-charcoal hover:text-rosedeep sm:block">
              <HeartIcon width={20} height={20} />
              {wishlist.length > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 text-[9px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/account" aria-label="Account" className="hidden p-2 text-charcoal hover:text-rosedeep sm:block">
              <UserIcon width={20} height={20} />
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative p-2 text-charcoal hover:text-rosedeep">
              <BagIcon width={21} height={21} />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-charcoal px-1 text-[9px] font-bold text-warm">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-charcoal/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto bg-warm shadow-lift transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-charcoal/8 px-5 py-4">
            <span className="font-serif text-xl font-semibold tracking-[0.2em] text-charcoal">
              {siteConfig.brand.name}
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-1 text-charcoal">
              <CloseIcon />
            </button>
          </div>
          <nav className="px-2 py-3">
            <Link href="/" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-charcoal hover:bg-cream">
              Home
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-charcoal hover:bg-cream"
              >
                {c.name}
                <ChevronRight width={16} height={16} className="text-clay" />
              </Link>
            ))}
            <Link href="/sale" className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-rosedeep hover:bg-cream">
              Sale
              <ChevronRight width={16} height={16} />
            </Link>
            <div className="my-2 border-t border-charcoal/8" />
            <Link href="/wishlist" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-ink hover:bg-cream">
              <HeartIcon width={18} height={18} /> Wishlist
            </Link>
            <Link href="/account" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-ink hover:bg-cream">
              <UserIcon width={18} height={18} /> Account
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
