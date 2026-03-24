"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroContent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure the initial hidden state renders first
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <h1
        className="text-white text-6xl md:text-8xl font-light tracking-tight mb-6 transition-all duration-[1200ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          filter: visible ? "blur(0px)" : "blur(8px)",
        }}
      >
        TestVibeCoding
      </h1>
      <div
        className="w-24 h-px bg-brand-gold mx-auto mb-6 transition-transform duration-700 ease-out"
        style={{
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: "600ms",
        }}
      />
      <p
        className="text-white/90 text-xl md:text-2xl font-light mb-10 transition-all duration-[1400ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          letterSpacing: visible ? "0.05em" : "0.3em",
          filter: visible ? "blur(0px)" : "blur(4px)",
          transitionDelay: "400ms",
        }}
      >
        Curating Elegance for Your Living Spaces
      </p>
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "900ms",
        }}
      >
        <Link
          href="/products"
          className="inline-block border-2 border-brand-gold text-brand-gold px-10 py-4 rounded-lg text-lg font-bold hover:bg-brand-gold hover:text-white transition-colors duration-300"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
