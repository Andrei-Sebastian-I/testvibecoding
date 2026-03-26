"use client";

import Image from "next/image";
import { type Product } from "@/lib/products";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted">
        <span className="material-symbols-outlined text-5xl mb-4 block">inventory_2</span>
        <p className="text-lg font-medium">No products yet</p>
        <p className="text-sm mt-1">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-primary/10 text-xs uppercase tracking-wider text-text-muted">
            <th className="py-3 px-3 sm:px-4 font-semibold w-full">Product</th>
            <th className="py-3 px-3 sm:px-4 font-semibold whitespace-nowrap hidden sm:table-cell">Category</th>
            <th className="py-3 px-3 sm:px-4 font-semibold text-right whitespace-nowrap">Price</th>
            <th className="py-3 px-3 sm:px-4 font-semibold text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-primary/5 hover:bg-primary/[0.02] transition-colors">
              <td className="py-3 px-3 sm:px-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg overflow-hidden bg-neutral-beige shrink-0 relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center text-text-muted">
                        <span className="material-symbols-outlined text-lg">image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-primary">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.subtitle}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-3 sm:px-4 hidden sm:table-cell">
                <span className="text-xs font-medium bg-primary/5 text-primary px-2 py-1 rounded-md">
                  {product.category}
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4 text-right text-sm font-semibold">${product.price}</td>
              <td className="py-3 px-3 sm:px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-1.5 rounded-md text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
