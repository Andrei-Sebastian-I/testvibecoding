import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import HeroContent from "@/components/HeroContent";
import { products } from "@/lib/products";
import { testimonials } from "@/lib/testimonials";
import { COMPANY } from "@/lib/constants";
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
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
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
          <span className="material-symbols-outlined text-white text-4xl">
            expand_more
          </span>
        </div>
      </section>

      {/* Brand Story / Why Us */}
      <section className="bg-background-warm py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "handyman",
                title: "Handcrafted",
                desc: "Every piece is made by skilled artisans using time-honoured techniques, ensuring uniqueness and character in each item.",
              },
              {
                icon: "eco",
                title: "Sustainable",
                desc: "We source responsibly, partnering with makers who prioritise eco-friendly materials and ethical production methods.",
              },
              {
                icon: "workspace_premium",
                title: "Curated",
                desc: "Our team hand-selects each item for quality, design, and craftsmanship — so you only see the very best.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-brand-gold/10 mb-6">
                  <span className="material-symbols-outlined text-brand-gold text-3xl">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-primary/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Our Curated Selection
          </h2>
          <div className="w-24 h-1 bg-brand-gold" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featured.map((p) => (
            <ProductCard key={p.id} {...p} variant="home" />
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-background-warm py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {products.map((p) => (
              <Link
                key={p.category}
                href="/products"
                className="group relative aspect-square overflow-hidden rounded-xl"
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

      {/* Process / How It's Made */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            How It&apos;s Made
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: "travel_explore",
              step: "01",
              title: "Source",
              desc: "We travel the world to discover the finest artisans and ethically sourced materials.",
            },
            {
              icon: "handyman",
              step: "02",
              title: "Craft",
              desc: "Each piece is meticulously handcrafted using traditional techniques passed down through generations.",
            },
            {
              icon: "local_shipping",
              step: "03",
              title: "Deliver",
              desc: "Carefully packaged and delivered to your door, ready to transform your living space.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-5xl font-bold text-primary/65 mb-4">
                {item.step}
              </div>
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-brand-gold/10 mb-6">
                <span className="material-symbols-outlined text-brand-gold text-3xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-primary/80 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background-warm py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              What Our Clients Say
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-10 rounded-xl shadow-sm border border-brand-gold/10"
              >
                <div className="flex text-brand-gold mb-6" role="img" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined fill-1"
                      aria-hidden="true"
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-primary/80 italic mb-8 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{t.name}</p>
                    <p className="text-sm text-primary/80">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Instagram Feed */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            From Our Gallery
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Living Room Elegance",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBXGbeadRxpg6U-SWz9AWKz4_0nvzZvt5lLan2MYq2H-KOQswqqFx6IKe5U5ixsSGlau5-Q4GEPbawl3Q4fbswjagA4EcZ379B8N3IrgUJYZJ4wdz5YxKQs02_HE0wrtzfzJ8ogeP9GPTATiUKQfVZsppswMWeBh5GyLet5vgvOXoksXFSNmpFQ-hb3bO4feFgYwl7fTbJoVNtqdKEh3UPmKV6miJ6o32SU6ybwZpmmUAuJsYHQXTZgUxIMxzYTUfdF5M2WwYpoKQrF",
            },
            {
              title: "Bedroom Retreat",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCwylClJXjea-b-BbpXnj0ehzlVTml96VOXvGKosXlxsZ6y_5N7p8GADE9ySiUEQfzT9L5HHtQ2ABNtAZ0kagKKVPXDAHi69ZOaKqEYa4LLwuqSUTEIJHzFGZ86GEiJ-QKa987URAaOT7oyxLq6jyRmox_nuA8GH3Ow3r3tWtEKC6mMkvuosGrmypi3PPobrRWQlRZwIJ0B_0ytEgFtc0Vik5hdBvaDzNaoTKnaKFiM7ztpaitw1L0MSoMXYzSnpM8--YAia2_0Iro6",
            },
            {
              title: "Kitchen Accents",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDd7pZZGeNOYFh2nTtpkDkoestG8ZVmZHP939oAXjoyYMUClglnqssKgJrjvy4RyoGZvOxQnlxGzhIPdvMEydXGU1BcIbvs__JbjypccQksiub4dHDFXvWKSRfG9gbulJxQYXi5_4x-t7YP6eiBs1bbZKQmqIfuPCnN0dPJ2Q6lfxPS_d6ftW6cJb8LtU-2K4gGqwAkGOHRtacdd64l061iDIqgf7FIczPNcAD82-OO35_NZBeyJiSTproR9cZEUYSjySCNQyOcwr-6",
            },
            {
              title: "Entryway Statement",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCsN-sc2TXSrF58UJMaryJ01O0R9dM3Z1ywO6nhRv0pjqqysUj_l-Bs3aIBKSgjr08jVRT5FNo6CgFHaVEmg9MHer7PvLqdZYnGNfJHRB1gB3qxPCnqVpZXFoKyiu_NdCigFkCuviDNq2NZNb-YXfps9fzNBszDRNyN-MN3OXjqDFADsNAOXmMkDdAck9g1I9jeHfMK-3YIEsUXrTb4SeciN-9GbiDTyi0exoanEUk22mH9FgHxXsCjGGBwEzukyd9Rof4RJKsJ0SCG",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="relative aspect-square overflow-hidden rounded-lg"
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
            <span className="material-symbols-outlined text-xl">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>

      {/* Partners / As Seen In */}
      <section className="bg-background-warm py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-primary/80 mb-10">
            As Seen In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
            {[
              "Architectural Digest",
              "Elle Decor",
              "House & Garden",
              "Wallpaper*",
              "Dwell",
            ].map((name) => (
              <span
                key={name}
                className="text-xl font-bold text-primary/80 tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">Stay Inspired</h2>
          <p className="text-lg opacity-80">
            Join our newsletter for the latest interior design trends and
            exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
            <input
              className="flex-1 rounded-lg border-none bg-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-accent-gold h-14 px-6 text-lg"
              placeholder="Enter your email"
              type="email"
              required
              aria-label="Enter your email"
            />
            <button
              type="submit"
              className="bg-accent-gold text-primary font-bold px-8 h-14 rounded-lg hover:bg-white transition-all text-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Visit Our Showroom */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-8">
              Visit Our Showroom
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">
                  location_on
                </span>
                <div>
                  <p className="font-bold text-lg">{COMPANY.address}</p>
                  <p className="text-primary/80">{COMPANY.cityFull}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">
                  call
                </span>
                <p className="text-primary/80">{COMPANY.phone}</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">
                  mail
                </span>
                <p className="text-primary/80">{COMPANY.email}</p>
              </div>
              <div className="pt-6">
                <p className="font-bold mb-2">Showroom Hours:</p>
                <p className="text-primary/80">
                  Mon - Fri: 10:00 AM - 7:00 PM
                </p>
                <p className="text-primary/80">
                  Sat - Sun: 11:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-primary/5">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAylV4iStLoxXG26Vmpjy22T65wHLYGMq3JtZYLDymQvmDnIPJyIPKDJRxxsszbnt5UvaSTe1K9YHKQkH_HeHwi7l2-xl-nQThOJQEpjD25l1IntSYDCPX1kOHIZTTcqh5xEp6-ccNk-NPvxGahMcer5SQIpM8uZz5_F7ao_w2wyNMyTld9GmQcvOtxs5Ux2v0dIKyIpj3z2baLgpbn7isorLHTxRvIDCTaCLpcEU7JZ-sBS3wO_QsAP7qnyv_f_WkVgBRIrM2-3Ulv"
              alt="Map placeholder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-50 grayscale"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-brand-gold text-6xl mb-4">
                  map
                </span>
                <p className="text-primary/80 font-medium">
                  Interactive Map Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
