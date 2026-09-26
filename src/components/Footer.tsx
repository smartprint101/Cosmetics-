import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/config/site";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "./Icons";

const shopLinks = [
  { name: "Skincare", href: "/category/skincare" },
  { name: "Makeup", href: "/category/makeup" },
  { name: "Hair Care", href: "/category/hair-care" },
  { name: "Body Care", href: "/category/body-care" },
  { name: "Fragrance", href: "/category/fragrance" },
  { name: "Sale", href: "/sale" },
];

const careLinks = [
  { name: "Contact", href: "/contact" },
  { name: "Delivery", href: "/delivery" },
  { name: "Return Policy", href: "/returns" },
  { name: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-charcoal/10 bg-cream">
      <div className="container-lux py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-serif text-2xl font-semibold tracking-[0.22em] text-charcoal">
              {siteConfig.brand.name}
            </span>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-clay">{siteConfig.brand.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink">
              {siteConfig.brand.shortDescription}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-warm">
                <FacebookIcon width={16} height={16} />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-warm">
                <InstagramIcon width={16} height={16} />
              </a>
              <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-warm">
                <TiktokIcon width={16} height={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Shop</h4>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-ink transition-colors hover:text-rosedeep">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Customer Care</h4>
            <ul className="mt-4 space-y-2.5">
              {careLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-ink transition-colors hover:text-rosedeep">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-rosedeep">
                  WhatsApp: {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneNumber}`} className="transition-colors hover:text-rosedeep">
                  Phone: {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-rosedeep">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-charcoal/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-clay">
            © {new Date().getFullYear()} {siteConfig.brand.name}. Demo store. All prices &amp; products are fictional.
          </p>
          <p className="text-xs text-clay">
            Demo Website by{" "}
            <a href={siteConfig.agency.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline-offset-2 hover:underline">
              {siteConfig.agency.name}
            </a>
          </p>
        </div>
        <p className="mt-3 text-center text-[11px] text-clay/80">{siteConfig.agency.note}</p>
      </div>
    </footer>
  );
}
