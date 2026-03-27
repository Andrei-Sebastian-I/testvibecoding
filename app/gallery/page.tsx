import Image from "next/image";
import type { Metadata } from "next";
import { galleryItems } from "@/lib/data/gallery-items";
import NewsletterForm from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A curated collection of our finest interior arrangements and decor inspirations, designed to elevate your living experience.",
  openGraph: {
    title: "Gallery",
    description:
      "A curated collection of our finest interior arrangements and decor inspirations, designed to elevate your living experience.",
  },
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-neutral-beige/50 py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-primary/80 max-w-2xl mx-auto leading-relaxed">
            A curated collection of our finest interior arrangements and decor
            inspirations, designed to elevate your living experience.
          </p>
          <div className="w-24 h-1 bg-accent-gold mx-auto rounded-full" />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="gallery-card group relative aspect-square overflow-hidden rounded-lg border border-accent-gold/30 bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out"
              />
              <div className="overlay absolute inset-0 bg-primary/80 opacity-0 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                <span aria-hidden="true" className="material-symbols-outlined text-white/50 mb-3 text-3xl">
                  {item.icon}
                </span>
                <h3 className="text-white text-xl font-bold uppercase tracking-widest">
                  {item.title}
                </h3>
                <div className="mt-4 h-px w-12 bg-accent-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black">Stay Inspired</h2>
          <p className="text-lg opacity-80">
            Join our newsletter for the latest interior design trends and
            exclusive project previews.
          </p>
          <NewsletterForm
            className="flex flex-col sm:flex-row w-full max-w-lg gap-3"
            inputClassName="flex-1 rounded-lg border-none bg-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-accent-gold h-14 px-6 text-lg"
            buttonClassName="bg-accent-gold text-primary font-bold px-8 h-14 rounded-lg hover:bg-white transition-all text-lg"
            placeholder="Enter your email"
          />
        </div>
      </section>
    </div>
  );
}
