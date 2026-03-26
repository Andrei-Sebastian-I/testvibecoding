import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getRelatedProducts, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductImageGallery from "@/components/ProductImageGallery";
import FavoriteButton from "@/components/FavoriteButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://testvibecoding.com";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(Number(id));
  if (!product) return {};
  const description = product.description.slice(0, 160);
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(Number(id));

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0],
    brand: {
      "@type": "Brand",
      name: "TestVibeCoding",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        {/* Back button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1 mb-10 text-sm text-primary/80 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Products
        </Link>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Images */}
          <ProductImageGallery images={product.images} name={product.name} />

          {/* Right: Details */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-primary/80 text-sm font-semibold uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">
                {product.name}
              </h1>
            </div>

            <p className="text-brand-gold-text text-3xl font-light">
              ${product.price}
            </p>

            <div className="w-16 h-px bg-primary/20" />

            <p className="text-primary/80 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 pt-4">
              <p className="text-sm text-primary/80 uppercase tracking-widest font-semibold">
                {product.subtitle}
              </p>
              <div className="flex items-center gap-3 text-sm text-primary/80">
                <span className="material-symbols-outlined text-brand-gold text-lg" aria-hidden="true">
                  local_shipping
                </span>
                Free shipping on orders over $150
              </div>
              <div className="flex items-center gap-3 text-sm text-primary/80">
                <span className="material-symbols-outlined text-brand-gold text-lg" aria-hidden="true">
                  verified
                </span>
                Authenticity guaranteed
              </div>
              <div className="flex items-center gap-3 text-sm text-primary/80">
                <span className="material-symbols-outlined text-brand-gold text-lg" aria-hidden="true">
                  autorenew
                </span>
                30-day return policy
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6">
              <FavoriteButton productId={product.id} />
              <WhatsAppButton productName={product.name} productPrice={product.price} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="font-serif text-3xl font-bold text-primary mb-10">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {related.map((p) => (
              <ProductCard key={p.id} {...p} variant="products" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
