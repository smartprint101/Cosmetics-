import type { Metadata } from "next";
import { siteConfig, whatsappUrl } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="container-lux py-6 sm:py-8">
      <Breadcrumb items={[{ label: "Contact" }]} />
      <h1 className="mb-3 mt-4 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">Contact Us</h1>
      <p className="max-w-2xl text-sm text-ink/80">
        যেকোনো প্রশ্ন বা order সংক্রান্ত সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা সাধারণত দ্রুত সাড়া দিই।
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-charcoal/8 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-charcoal">Get in touch</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-clay">WhatsApp</dt><dd className="font-medium text-charcoal">{siteConfig.whatsappDisplay}</dd></div>
            <div className="flex justify-between"><dt className="text-clay">Phone</dt><dd className="font-medium text-charcoal">{siteConfig.phoneDisplay}</dd></div>
            <div className="flex justify-between"><dt className="text-clay">Email</dt><dd className="font-medium text-charcoal">{siteConfig.email}</dd></div>
            <div className="flex justify-between"><dt className="text-clay">Location</dt><dd className="font-medium text-charcoal">{siteConfig.location}</dd></div>
          </dl>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-charcoal/8 bg-cream p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
            <WhatsAppIcon width={26} height={26} />
          </div>
          <p className="mt-4 text-sm text-ink/85">দ্রুত সাড়া পেতে সরাসরি WhatsApp-এ মেসেজ দিন।</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
