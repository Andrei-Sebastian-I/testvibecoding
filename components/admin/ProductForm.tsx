"use client";

import { useState } from "react";
import { type Product } from "@/lib/products";
import { inputClass } from "@/lib/admin/shared";

interface ProductFormProps {
  initial?: Product;
  onSubmit: (data: Omit<Product, "id">) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ initial, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    initial?.images?.slice(1) ?? []
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const allImages = [image, ...additionalImages].filter(Boolean);
      await onSubmit({
        name,
        subtitle,
        price: Number(price),
        category,
        description,
        image,
        images: allImages,
      });
    } finally {
      setSaving(false);
    }
  }

  function addImageField() {
    setAdditionalImages([...additionalImages, ""]);
  }

  function updateImage(index: number, value: string) {
    const updated = [...additionalImages];
    updated[index] = value;
    setAdditionalImages(updated);
  }

  function removeImage(index: number) {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            Name *
          </label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Product name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            Subtitle
          </label>
          <input
            className={inputClass}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Short subtitle"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            Price *
          </label>
          <input
            className={inputClass}
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            Category
          </label>
          <input
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Ceramics"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
          Description
        </label>
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description..."
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
          Main Image URL
        </label>
        <input
          className={inputClass}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
            Additional Images
          </label>
          <button
            type="button"
            onClick={addImageField}
            className="text-xs font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors cursor-pointer"
          >
            + Add Image
          </button>
        </div>
        <div className="space-y-2">
          {additionalImages.map((url, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={`${inputClass} flex-1`}
                value={url}
                onChange={(e) => updateImage(i, e.target.value)}
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="p-2 text-text-muted hover:text-red-600 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-gold text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : initial ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold text-text-muted hover:text-primary border border-primary/10 hover:border-primary/20 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
