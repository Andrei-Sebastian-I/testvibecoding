import ProductCard from "@/components/product-card";
import NewsletterForm from "@/components/newsletter-form";
import { products } from "@/lib/products";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://testvibecoding.com";

const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/products/${p.id}`,
    name: p.name,
  })),
};

export const metadata: Metadata = {
  title: "Our Collection",
  description:
    "Discover a curated selection of handcrafted home decor essentials designed to bring warmth and sophistication to your living space.",
  openGraph: {
    title: "Our Collection",
    description:
      "Discover a curated selection of handcrafted home decor essentials designed to bring warmth and sophistication to your living space.",
  },
};

export default function ProductsPage() {
  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />
      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-4 py-16 md:py-24 px-6">
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-primary">
          Our Collection
        </h1>
        <div className="w-16 h-0.5 bg-primary/20 my-2" />
        <p className="text-primary/80 text-lg md:text-xl max-w-2xl leading-relaxed">
          Discover a curated selection of handcrafted essentials designed to
          bring warmth and sophistication to your living space.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} variant="products" />
          ))}

          {/* Coming Soon Card */}
          <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-primary/20 rounded-xl aspect-[3/4] p-10 text-center">
            <span aria-hidden="true" className="material-symbols-outlined text-4xl text-primary/30">
              auto_awesome
            </span>
            <p className="font-serif text-xl italic text-primary/80">
              More pieces arriving soon
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className="bg-primary text-background-light py-20 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Join Our Private List
          </h2>
          <p className="text-background-light/70 text-lg max-w-xl mx-auto leading-relaxed">
            Be the first to know about new arrivals and exclusive artisan
            collections. No spam, only beauty.
          </p>
          <NewsletterForm
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto w-full mt-4"
            inputClassName="flex-1 bg-white/10 border border-white/20 rounded-lg px-6 py-4 focus:ring-0 focus:border-white/40 placeholder:text-white/40 text-white"
            buttonClassName="bg-background-light text-primary font-bold px-8 py-4 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm"
          />
        </div>
      </section>
    </div>
  );
}
