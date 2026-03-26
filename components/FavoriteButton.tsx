"use client";

import { useFavorites } from "@/lib/favorites-context";

interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavorites();
  const favorited = isFavorite(productId);

  return (
    <button
      onClick={() => toggle(productId)}
      className={`w-full py-4 rounded-lg font-bold text-lg transition-all cursor-pointer flex items-center justify-center gap-3 ${
        favorited
          ? "bg-red-50 text-red-500 border-2 border-red-200 hover:bg-red-100"
          : "bg-primary text-white hover:bg-primary/90"
      }`}
    >
      <span className={`material-symbols-outlined ${favorited ? "fill-1" : ""}`}>
        favorite
      </span>
      {favorited ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
