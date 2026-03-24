import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const socialIcons = [
  { icon: "public", label: "Facebook" },
  { icon: "share", label: "Twitter" },
  { icon: "thumb_up", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white py-20 px-6 border-t border-brand-gold/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tighter text-white">
            {COMPANY.shortName}
          </h2>
          <p className="text-white/70 leading-relaxed max-w-xs">
            Transforming spaces through curated elegance and timeless design.
            Join our journey in crafting beautiful homes.
          </p>
          <div className="flex gap-4">
            {socialIcons.map(({ icon, label }) => (
              <a
                key={icon}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold transition-all"
              >
                <span className="material-symbols-outlined text-sm">
                  {icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Links Column */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {[
              { label: "Latest Collection", href: "/products" },
              { label: "Our Story", href: "/about" },
              { label: "Gallery", href: "/gallery" },
              { label: "Shipping & Returns", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Find Us Column */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest">
            Find Us
          </h3>
          <div className="space-y-4">
            <p className="text-white/70">
              {COMPANY.address}
              <br />
              {COMPANY.city}
            </p>
            <p className="text-white/70">T: {COMPANY.phone}</p>
            <div className="pt-4">
              <h4 className="text-white font-bold mb-2 text-sm uppercase">
                Newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  className="bg-white/10 border border-brand-gold/30 text-white rounded-lg focus:ring-brand-gold focus:border-brand-gold grow px-4 py-2 placeholder:text-white/40"
                  placeholder="Email address"
                  type="email"
                  required
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="bg-white text-brand-green px-4 py-2 rounded-lg font-bold hover:bg-white/90 transition-all"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10 text-center text-white/70 text-sm">
        <p>
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
