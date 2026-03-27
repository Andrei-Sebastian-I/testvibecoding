import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ShopByCategory({ products }: { products: Product[] }) {
  return (
    <section className="bg-background-warm py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((p) => (
            <Link
              key={p.category}
              href="/products"
              className="group relative aspect-square overflow-hidden rounded-xl bg-primary/10"
            >
              <Image
                src={p.image}
                alt={p.category}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/60 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-bold tracking-wide">
                  {p.category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
