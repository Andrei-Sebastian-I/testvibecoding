import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/products";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Our Curated Selection
        </h2>
        <div className="w-24 h-1 bg-brand-gold" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} variant="home" />
        ))}
      </div>
    </section>
  );
}
