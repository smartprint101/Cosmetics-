"use client";

import { useEffect, useState } from "react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { WhatsAppIcon, CloseIcon } from "./Icons";

export function WhatsAppButton() {
  const [showCta, setShowCta] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {showCta && !dismissed && (
        <div className="animate-fadeUp relative max-w-[220px] rounded-2xl rounded-br-sm bg-white px-3.5 py-2.5 text-right shadow-lift ring-1 ring-charcoal/5">
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-warm"
          >
            <CloseIcon width={12} height={12} />
          </button>
          <a href={whatsappUrl(siteConfig.whatsappCta)} target="_blank" rel="noopener noreferrer">
            <p className="text-[12.5px] font-medium leading-snug text-charcoal">{siteConfig.whatsappCta}</p>
          </a>
        </div>
      )}

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-pulseRing" />
        <WhatsAppIcon width={30} height={30} className="relative animate-floaty" />
      </a>
    </div>
  );
}
