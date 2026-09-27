/**
 * Centralized site configuration.
 * Change brand info, contact details, WhatsApp number, delivery charges and
 * social links here — the whole website reads from this single source.
 */

export const siteConfig = {
  brand: {
    name: "LUMÉRA",
    tagline: "Beauty, Made Effortless.",
    shortDescription:
      "LUMÉRA is a premium beauty destination bringing curated skincare, makeup and beauty essentials to your everyday routine — thoughtfully selected, quality checked and delivered across Bangladesh.",
  },

  // WhatsApp — keep the international format for building chat URLs.
  // Displayed local format is shown separately in the UI.
  whatsappNumber: "8801876892958",
  whatsappDisplay: "01876892958",
  whatsappCta: "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।",
  whatsappPrefilledMessage:
    "আসসালামু আলাইকুম। আমি LUMÉRA Cosmetics Demo Website দেখে যোগাযোগ করছি। আমার Business-এর জন্য এমন একটি Website তৈরি করতে চাই।",

  // Contact information
  phoneDisplay: "01876892958",
  phoneNumber: "8801876892958",
  email: "hello@lumera-demo.com",
  location: "Dhaka, Bangladesh",

  // Delivery configuration (change charges here — used in cart & checkout)
  delivery: {
    insideDhaka: 70,
    outsideDhaka: 130,
    insideDhakaLabel: "Inside Dhaka",
    outsideDhakaLabel: "Outside Dhaka",
    note: "Delivery available across Bangladesh.",
  },

  // Announcement bar messages (rotates through these)
  announcements: [
    "Cash on Delivery Available Across Bangladesh",
    "Free Delivery on Selected Orders",
    "সারা বাংলাদেশে দ্রুত হোম ডেলিভারি",
  ],

  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },

  // Agency branding (kept subtle in the footer)
  agency: {
    name: "CodePixel Web",
    note: "This is a demonstration website created by CodePixel Web.",
    url: "https://wa.me/8801876892958",
  },
};

/** Currency formatting helper — used everywhere prices are shown. */
export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

/** Build a WhatsApp chat URL with the pre-filled message. */
export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.whatsappPrefilledMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

export type SiteConfig = typeof siteConfig;
