"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  const messages = siteConfig.announcements;
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div className="bg-charcoal text-warm">
      <div className="container-lux flex h-9 items-center justify-center overflow-hidden text-center">
        <p key={i} className="animate-fadeIn text-[11px] font-medium tracking-[0.12em] sm:text-xs">
          {messages[i]}
        </p>
      </div>
    </div>
  );
}
