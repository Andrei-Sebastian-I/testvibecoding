import Image from "next/image";
import type { Metadata } from "next";

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

const galleryItems = [
  {
    title: "Living Room Elegance",
    icon: "chair",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXGbeadRxpg6U-SWz9AWKz4_0nvzZvt5lLan2MYq2H-KOQswqqFx6IKe5U5ixsSGlau5-Q4GEPbawl3Q4fbswjagA4EcZ379B8N3IrgUJYZJ4wdz5YxKQs02_HE0wrtzfzJ8ogeP9GPTATiUKQfVZsppswMWeBh5GyLet5vgvOXoksXFSNmpFQ-hb3bO4feFgYwl7fTbJoVNtqdKEh3UPmKV6miJ6o32SU6ybwZpmmUAuJsYHQXTZgUxIMxzYTUfdF5M2WwYpoKQrF",
  },
  {
    title: "Bedroom Retreat",
    icon: "bed",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwylClJXjea-b-BbpXnj0ehzlVTml96VOXvGKosXlxsZ6y_5N7p8GADE9ySiUEQfzT9L5HHtQ2ABNtAZ0kagKKVPXDAHi69ZOaKqEYa4LLwuqSUTEIJHzFGZ86GEiJ-QKa987URAaOT7oyxLq6jyRmox_nuA8GH3Ow3r3tWtEKC6mMkvuosGrmypi3PPobrRWQlRZwIJ0B_0ytEgFtc0Vik5hdBvaDzNaoTKnaKFiM7ztpaitw1L0MSoMXYzSnpM8--YAia2_0Iro6",
  },
  {
    title: "Kitchen Accents",
    icon: "cooking",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd7pZZGeNOYFh2nTtpkDkoestG8ZVmZHP939oAXjoyYMUClglnqssKgJrjvy4RyoGZvOxQnlxGzhIPdvMEydXGU1BcIbvs__JbjypccQksiub4dHDFXvWKSRfG9gbulJxQYXi5_4x-t7YP6eiBs1bbZKQmqIfuPCnN0dPJ2Q6lfxPS_d6ftW6cJb8LtU-2K4gGqwAkGOHRtacdd64l061iDIqgf7FIczPNcAD82-OO35_NZBeyJiSTproR9cZEUYSjySCNQyOcwr-6",
  },
  {
    title: "Entryway Statement",
    icon: "door_front",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsN-sc2TXSrF58UJMaryJ01O0R9dM3Z1ywO6nhRv0pjqqysUj_l-Bs3aIBKSgjr08jVRT5FNo6CgFHaVEmg9MHer7PvLqdZYnGNfJHRB1gB3qxPCnqVpZXFoKyiu_NdCigFkCuviDNq2NZNb-YXfps9fzNBszDRNyN-MN3OXjqDFADsNAOXmMkDdAck9g1I9jeHfMK-3YIEsUXrTb4SeciN-9GbiDTyi0exoanEUk22mH9FgHxXsCjGGBwEzukyd9Rof4RJKsJ0SCG",
  },
  {
    title: "Dining Table Setup",
    icon: "dining",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADSYbg6cw1WH7Iy_7369URAVB0gBXRupX83_47E8Scho7xnSlz53_VMTXvMg3EEn671S_uMj2JGmtroS6C4ue1ozG9gskHEJ7VwTe9cpw6LfS9gywM0dTPbH2nU0AhrJ4ZA6Nhhn3uraZqaavTtCoQ-KJA_SJyL4TR-1-7VakKhR8xXr7YVxNLP35A_zIgLUy3Gi9Z-kOjPmMSMcBTmzRRRXQaq_NV8oLtSJInPrgsyUpDYEph-9CXKUKPOf4JRfMmiZX6eqzimPzk",
  },
  {
    title: "Bathroom Luxe",
    icon: "bathtub",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7mEzvMUhp_PudbTjEs_aseyZw8pPjpIUSNb9RmaGyTHjp_CsWR-pCUKjlUB3Klbs5aHueAFoBeertQsJtXei8WgX6ADT6uq9qlVMJ-xxgCSAGT5m9bwA944_uUabesidNOsyuDFnmwzQMVJwKPkgV-JAa9yP3d5xXgb7dRxjysnnCAOmcVPD61ZRNLQrhVAxYNByXGL0M1FGS8bz1rHMY3OhR1t3tGQD7ua4ndBcIpwi3R99Jb1anFsRqVZQi4Z7b83RdNAvBJyFS",
  },
  {
    title: "Office Inspiration",
    icon: "work",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9ADGSH6StljxNEomXW7CPxz7SMdVrfc0I2brpFiK2erE-30S3ptRA-0EKSoWQfgdIawxq9Jjf4IIr9Tva3sFSnav1JlM6op8jYLbvnNAEEIihoKtXx8Q7eV0vHb5B70PEbZnfJsIq96kftPV6XOnvBux7OY_vkEmXWEEZtWj6eV3e37DSG7L2ZdxXlUoGgEt0zdr3fPGsAx0anS9rEFH8LwZA0MspfZk544K0sNP6nBmOnU9cdQdxA5TY7FALqIuhGViqONQlG82-",
  },
  {
    title: "Garden Decor",
    icon: "potted_plant",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpKUMAiS923agQBETln2t238yxaXupDbK8yCtl4UEwj1kYdS7OYpZIulZhFzDUE2WiDyjBZq8rx8IiidGvnaMBDt8JNURnWK7V8p8Ul58lUQ-9raULgb99h7OJ-c6PRmZMnfOJcd_utWs5-UlDLrsJpoOF6xWbBhW5zZSEpq0iRXixkd_8vUJeG6DeFIuZ5P6UpR27e8vE3f1c7Jh9JWArd-WEndPuQvXHCJ-X9EEBPvh6YvRTgbTEUHqFwStb2yv__FcSMCx-ff1E",
  },
];

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
                <span className="material-symbols-outlined text-white/50 mb-3 text-3xl">
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
    </div>
  );
}
