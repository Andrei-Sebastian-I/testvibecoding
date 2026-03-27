"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/context/favorites-context";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  subtitle: string;
  image: string;
  variant?: "home" | "products";
}

export default function ProductCard({
  id,
  name,
  price,
  subtitle,
  image,
  variant = "products",
}: ProductCardProps) {
  const { toggle, isFavorite } = useFavorites();
  const favorited = isFavorite(id);

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  }

  if (variant === "home") {
    return (
      <Link href={`/products/${id}`} className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-xl mb-6 aspect-[4/5] shadow-sm group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 bg-primary/5">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <button
            onClick={handleFavorite}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            className={`absolute top-4 right-4 bg-white/90 p-2 rounded-full transition-all cursor-pointer hover:scale-110 ${
              favorited ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <span aria-hidden="true"
              className={`material-symbols-outlined text-primary ${
                favorited ? "fill-1 text-red-500" : ""
              }`}
            >
              favorite
            </span>
          </button>
        </div>
        <h3 className="text-xl font-bold text-primary mb-1">{name}</h3>
        <p className="text-primary/80 font-medium">${price.toLocaleString()}</p>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${id}`}
      className="group flex flex-col gap-6 cursor-pointer transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-primary/5">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          onClick={handleFavorite}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-4 right-4 bg-white/90 p-2 rounded-full transition-all cursor-pointer hover:scale-110 ${
            favorited ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <span aria-hidden="true"
            className={`material-symbols-outlined ${
              favorited ? "fill-1 text-red-500" : "text-primary"
            }`}
          >
            favorite
          </span>
        </button>
      </div>
      <div className="flex flex-col items-center text-center gap-2">
        <h3 className="font-serif text-2xl font-bold group-hover:text-primary/80 transition-colors">
          {name}
        </h3>
        <p className="text-primary/80 text-sm font-medium tracking-wide uppercase">
          {subtitle}
        </p>
        <span className="text-xl font-light mt-1">${price}</span>
      </div>
    </Link>
  );
}
