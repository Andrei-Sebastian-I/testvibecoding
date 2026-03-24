"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export default function ProductImageGallery({
  images,
  name,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-primary/5">
        <Image
          src={images[selectedImage]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === i
                ? "border-brand-gold shadow-lg"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${name} view ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 33vw, 16vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
