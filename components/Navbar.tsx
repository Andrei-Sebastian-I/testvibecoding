"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useFavorites } from "@/lib/favorites-context";
import { products } from "@/lib/products";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMsg, setContactMsg] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const favRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const { favorites, toggle, count } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (favRef.current && !favRef.current.contains(e.target as Node)) {
        setFavOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    }
    if (favOpen || contactOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [favOpen, contactOpen]);

  // Close dropdowns on route change
  useEffect(() => {
    setFavOpen(false);
    setContactOpen(false);
  }, [pathname]);

  function handleContactSend(e: React.FormEvent) {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    // For now just show success — hook up to a real backend later
    setContactSent(true);
    setContactMsg("");
    setTimeout(() => {
      setContactSent(false);
      setContactOpen(false);
    }, 2000);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
        isHome
          ? "bg-brand-green/80 backdrop-blur-nav border-brand-gold/20"
          : "bg-background-light/80 backdrop-blur-nav border-primary/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {isHome ? (
            <span className="text-brand-gold text-3xl font-extrabold tracking-tighter">
              TVC
            </span>
          ) : (
            <div className="flex items-center gap-3 text-primary">
              <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                  database
                </span>
              </div>
              <span className="text-xl font-extrabold leading-tight tracking-tight uppercase">
                TestVibeCoding
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  isHome
                    ? isActive
                      ? "text-brand-gold"
                      : "text-white/90 hover:text-brand-gold"
                    : isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-primary/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {isHome ? (
            <Link
              href="/products"
              className="bg-brand-gold text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all hidden sm:block"
            >
              Contact
            </Link>
          ) : (
            <div className="flex gap-2">
              {/* Favorites dropdown */}
              <div ref={favRef} className="relative">
                <button
                  onClick={() => { setFavOpen(!favOpen); setContactOpen(false); }}
                  aria-label="Favorites"
                  className="relative flex items-center justify-center rounded-full size-10 bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">favorite</span>
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 size-5 bg-brand-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </button>

                {favOpen && (
                  <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-xl shadow-xl border border-primary/10 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-primary/10 flex items-center justify-between">
                      <h3 className="font-bold text-sm text-primary">
                        Favorites ({count})
                      </h3>
                      <button
                        onClick={() => setFavOpen(false)}
                        className="p-0.5 text-text-muted hover:text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>

                    {favoriteProducts.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <span className="material-symbols-outlined text-4xl text-primary/15 mb-2 block">
                          favorite
                        </span>
                        <p className="text-sm text-text-muted">No favorites yet</p>
                        <Link
                          href="/products"
                          onClick={() => setFavOpen(false)}
                          className="text-xs font-semibold text-brand-gold hover:underline mt-2 inline-block"
                        >
                          Browse products
                        </Link>
                      </div>
                    ) : (
                      <div className="max-h-80 overflow-y-auto">
                        {favoriteProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-primary/[0.02] transition-colors border-b border-primary/5 last:border-b-0"
                          >
                            <Link
                              href={`/products/${product.id}`}
                              onClick={() => setFavOpen(false)}
                              className="shrink-0 relative size-12 rounded-lg overflow-hidden bg-primary/5"
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </Link>
                            <Link
                              href={`/products/${product.id}`}
                              onClick={() => setFavOpen(false)}
                              className="flex-1 min-w-0"
                            >
                              <p className="text-sm font-semibold text-primary truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-text-muted">${product.price}</p>
                            </Link>
                            <button
                              onClick={() => toggle(product.id)}
                              aria-label={`Remove ${product.name} from favorites`}
                              className="shrink-0 p-1.5 rounded-md text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <span className="material-symbols-outlined fill-1 text-lg">
                                favorite
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Us dropdown */}
              <div ref={contactRef} className="relative">
                <button
                  onClick={() => { setContactOpen(!contactOpen); setFavOpen(false); }}
                  aria-label="Contact Us"
                  className="flex items-center justify-center rounded-full size-10 bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">mail</span>
                </button>

                {contactOpen && (
                  <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-xl shadow-xl border border-primary/10 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-primary/10 flex items-center justify-between">
                      <h3 className="font-bold text-sm text-primary">Contact Us</h3>
                      <button
                        onClick={() => setContactOpen(false)}
                        className="p-0.5 text-text-muted hover:text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>

                    {contactSent ? (
                      <div className="px-4 py-8 text-center">
                        <span className="material-symbols-outlined text-4xl text-green-500 mb-2 block">
                          check_circle
                        </span>
                        <p className="text-sm font-semibold text-primary">Message sent!</p>
                        <p className="text-xs text-text-muted mt-1">We&apos;ll get back to you soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSend} className="p-4 space-y-3">
                        <p className="text-xs text-text-muted">
                          Send us a message and our team will reply as soon as possible.
                        </p>
                        <textarea
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          placeholder="Write your message..."
                          required
                          rows={4}
                          className="w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full bg-brand-gold text-white py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-lg">send</span>
                          Send Message
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={`material-symbols-outlined ${
                isHome ? "text-white" : "text-primary"
              }`}
            >
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background-light border-t border-primary/10 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-primary text-sm font-semibold py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
