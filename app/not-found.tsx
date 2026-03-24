import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-7xl md:text-9xl font-bold text-primary/10">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mt-4">
        Page Not Found
      </h2>
      <p className="text-primary/60 mt-4 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
