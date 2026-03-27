"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import FavoritesDropdown from "./favorites-dropdown";
import ContactDropdown from "./contact-dropdown";
import MobileMenu from "./mobile-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
];

type OpenPanel = "none" | "fav" | "contact" | "mobile";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [openPanel, setOpenPanel] = useState<OpenPanel>("none");

  const mobileOpen = openPanel === "mobile";
  const favOpen = openPanel === "fav";
  const contactOpen = openPanel === "contact";

  // Close all panels on route change — pathname is an external value from the
  // router, so synchronising local UI state to it is a valid effect usage.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setOpenPanel("none");
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
        isHome
          ? "bg-brand-green/80 backdrop-blur-nav border-brand-gold/20"
          : "bg-background-light/80 backdrop-blur-nav border-primary/10"
      }`}
    >
      <div className="relative z-50 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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
          <div className="flex gap-2">
            <FavoritesDropdown
              isOpen={favOpen}
              onToggle={() => setOpenPanel(favOpen ? "none" : "fav")}
              onClose={() => setOpenPanel("none")}
              isHome={isHome}
            />
            <ContactDropdown
              isOpen={contactOpen}
              onToggle={() => setOpenPanel(contactOpen ? "none" : "contact")}
              onClose={() => setOpenPanel("none")}
              isHome={isHome}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2"
            onClick={() => setOpenPanel(mobileOpen ? "none" : "mobile")}
          >
            <span aria-hidden="true"
              className={`material-symbols-outlined ${
                isHome ? "text-white" : "text-primary"
              }`}
            >
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setOpenPanel("none")}
        pathname={pathname}
        isHome={isHome}
      />
    </nav>
  );
}
