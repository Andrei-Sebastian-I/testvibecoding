"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/lib/favorites-context";
import { products } from "@/lib/products";
import { useClickOutside } from "@/hooks/useClickOutside";

interface FavoritesDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function FavoritesDropdown({ isOpen, onToggle, onClose }: FavoritesDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { favorites, toggle, count } = useFavorites();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  useClickOutside(ref, onClose, isOpen);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
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

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-xl shadow-xl border border-primary/10 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-primary/10 flex items-center justify-between">
            <h3 className="font-bold text-sm text-primary">
              Favorites ({count})
            </h3>
            <button
              onClick={onClose}
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
                onClick={onClose}
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
                    onClick={onClose}
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
                    onClick={onClose}
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
  );
}
