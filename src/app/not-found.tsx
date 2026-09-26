import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-lux flex flex-col items-center py-24 text-center">
      <p className="font-serif text-6xl font-semibold text-nude">404</p>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-charcoal">Page not found</h1>
      <p className="mt-2 text-sm text-clay">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}
