import Image from "next/image";
import Link from "next/link";
import { homeGalleryItems } from "@/lib/data/home-gallery";

export default function GalleryPreview() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          From Our Gallery
        </h2>
        <div className="w-24 h-1 bg-brand-gold mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {homeGalleryItems.map((item) => (
          <div
            key={item.title}
            className="relative aspect-square overflow-hidden rounded-lg bg-primary/5"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-brand-gold-text font-bold hover:underline"
        >
          View Full Gallery
          <span aria-hidden="true" className="material-symbols-outlined text-xl">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
