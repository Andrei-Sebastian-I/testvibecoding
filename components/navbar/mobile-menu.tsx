"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
  isHome: boolean;
}

export default function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-green/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Nav content */}
      <div className="relative flex flex-col items-center justify-center h-full gap-2">
        {navLinks.map((link, i) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-semibold tracking-wide py-3 px-6 rounded-xl transition-all duration-300 ${
                isActive
                  ? "text-brand-gold"
                  : "text-white/80 hover:text-white"
              }`}
              style={{
                transitionDelay: open ? `${i * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open
                  ? "translateY(0)"
                  : "translateY(12px)",
              }}
              onClick={onClose}
            >
              {link.label}
            </Link>
          );
        })}

        <div
          className="mt-6 transition-all duration-300"
          style={{
            transitionDelay: open
              ? `${navLinks.length * 60}ms`
              : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <Link
            href="/products"
            className="inline-block bg-brand-gold text-white px-8 py-3 rounded-lg text-base font-bold hover:bg-brand-gold/90 transition-colors"
            onClick={onClose}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
