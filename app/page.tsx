import Image from "next/image";
import HeroContent from "@/components/HeroContent";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ShopByCategory from "@/components/home/ShopByCategory";
import HowItsMade from "@/components/home/HowItsMade";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import PartnersBar from "@/components/home/PartnersBar";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import ShowroomSection from "@/components/home/ShowroomSection";
import { products } from "@/lib/products";
import { testimonials } from "@/lib/testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "TestVibeCoding | Premium Home Decor",
  },
  description:
    "Curating elegance for your living spaces. Discover handcrafted home decor, artisan ceramics, textiles, and more.",
  openGraph: {
    title: "TestVibeCoding | Premium Home Decor",
    description:
      "Curating elegance for your living spaces. Discover handcrafted home decor, artisan ceramics, textiles, and more.",
  },
};

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDxBJoKDnvIoZjAzMBBPYevdTcabPaLRxhkfMs1qdJHw1eNIpubGCoM-F8FDtGF8c7Uafka1T4MBY5NERONp3V2UqLhDoguEyUeIXjVQ5Js8as1-UN_3hQ1zN4NCmYE510e-mey4mdRlwsD7dNw_UGnq4mIb5R1ovpD1zJVOhPvPu24uwJfiQB1ZZNqDl3xozZgVYvac39wNrSbcjQq4DcBEog1X6FTS_ZMIWl-tk3Go48DUbbEKOhYl2-hyl9NsiBXHC2HR2QvuR_"
          alt="Elegant home interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <HeroContent />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      <WhyChooseUs />
      <FeaturedProducts products={featured} />
      <ShopByCategory products={products} />
      <HowItsMade />
      <TestimonialsSection testimonials={testimonials} />
      <GalleryPreview />
      <PartnersBar />
      <NewsletterCTA />
      <ShowroomSection />
    </>
  );
}
