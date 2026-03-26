import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Our mission is to bring soul into every space through handcrafted decor. Learn about our heritage, team, and artisan partnerships.",
  openGraph: {
    title: "About Us",
    description:
      "Our mission is to bring soul into every space through handcrafted decor. Learn about our heritage, team, and artisan partnerships.",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Brand Story */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                Our Heritage
              </span>
              <h1 className="text-primary text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
                Our Story
              </h1>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-primary/80 text-lg leading-relaxed font-medium">
                Our mission is to bring soul into every space through
                handcrafted decor. We believe that every home should tell a
                story, which is why we partner with artisans worldwide to curate
                unique, timeless pieces that blend heritage with modern elegance.
              </p>
              <p className="text-primary/80 text-base leading-relaxed">
                Founded in 2018, TestVibeCoding began as a small workshop
                dedicated to preserving traditional techniques in a fast-paced
                world. Today, we stand as a bridge between master craftsmen and
                discerning homeowners who value quality over quantity.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold text-base hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-xl transition-all group-hover:inset-0" />
              <div className="relative aspect-[4/5] rounded-lg shadow-2xl border border-primary/10 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIuVaIh_jtwvKJNFLO2JKOvbtc0e_Jm6uuQOzOF1CsBztPXD7BkJAm-XQ8G_QNUIoSVBlTarnAbXhtbvpvWZ8jrfwcOhGJf2jxCfY_Io0X6LVSIv8de3RGMefk2CAEyGz6tk4tDu0FH1nQNx7ZUjGUBFBgavmNIyBqLSz977UvksJN5wJy7fCBXpXqgOgsWWPsKUlizbkd2-WGG6jaaf6TO09jAT6Si0YMVv2mlxt3WvpyQX7CbCYNHy-xr2WPjwWwgaW2OE_H8gp2"
                  alt="Elegant interior"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 flex flex-col items-center gap-3">
            <h2 className="text-primary text-4xl font-black tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-primary/80 max-w-lg">
              The visionaries and artisans behind our curated collections.
            </p>
            <div className="w-12 h-1 bg-primary/30 rounded-full mt-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center gap-6 p-8 rounded-xl bg-background-light border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="size-32 rounded-full overflow-hidden border-4 border-white shadow-md transition-transform group-hover:scale-105">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-primary text-xl font-bold">
                    {member.name}
                  </h3>
                  <p className="text-primary/80 text-sm font-semibold uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="text-primary text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Bring Artistry to Your Home
          </h2>
          <p className="text-primary/80 text-lg">
            Every piece in our shop is hand-selected to ensure it carries the
            warmth and character your home deserves.
          </p>
          <div className="flex justify-center pt-4">
            <Link
              href="/products"
              className="bg-primary text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-2xl"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
