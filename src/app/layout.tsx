import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumera-demo.vercel.app"),
  title: {
    default: "LUMÉRA — Premium Cosmetics & Beauty Store in Bangladesh",
    template: "%s | LUMÉRA",
  },
  description:
    "LUMÉRA is a premium cosmetics and beauty e-commerce demo website created by CodePixel Web for the Bangladesh market.",
  keywords: [
    "cosmetics bangladesh",
    "beauty store",
    "skincare",
    "makeup",
    "premium cosmetics",
    "LUMÉRA",
  ],
  openGraph: {
    title: "LUMÉRA — Premium Cosmetics & Beauty Store in Bangladesh",
    description:
      "Discover skincare, makeup and beauty essentials curated for your everyday routine. A premium beauty demo store for the Bangladesh market.",
    type: "website",
    locale: "en_US",
    siteName: "LUMÉRA",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMÉRA — Premium Cosmetics & Beauty Store",
    description: "Premium cosmetics & beauty e-commerce demo for Bangladesh.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#26211E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
