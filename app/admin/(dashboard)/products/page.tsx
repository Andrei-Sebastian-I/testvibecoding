"use client";

import { useEffect, useState, useCallback } from "react";
import { type Product } from "@/lib/products";
import ProductTable from "@/components/admin/product-table";
import ProductForm from "@/components/admin/product-form";
import FeedbackToast from "@/components/admin/feedback-toast";

type Mode = { type: "list" } | { type: "create" } | { type: "edit"; product: Product };

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        setProducts(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function handleCreate(data: Omit<Product, "id">) {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await fetchProducts();
      setMode({ type: "list" });
      setFeedback({ type: "success", message: "Product created successfully" });
    } else {
      setFeedback({ type: "error", message: "Failed to create product" });
    }
  }

  async function handleEdit(data: Omit<Product, "id">) {
    if (mode.type !== "edit") return;
    const res = await fetch(`/api/admin/products/${mode.product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await fetchProducts();
      setMode({ type: "list" });
      setFeedback({ type: "success", message: "Product updated successfully" });
    } else {
      setFeedback({ type: "error", message: "Failed to update product" });
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchProducts();
      setFeedback({ type: "success", message: "Product deleted" });
    } else {
      setFeedback({ type: "error", message: "Failed to delete product" });
    }
  }

  return (
    <div>
      <FeedbackToast feedback={feedback} onDismiss={() => setFeedback(null)} />
      {mode.type === "list" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary">Products</h2>
              <p className="text-sm text-text-muted mt-0.5">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setMode({ type: "create" })}
              className="flex items-center gap-2 bg-brand-gold text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all cursor-pointer"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-lg">add</span>
              Add Product
            </button>
          </div>

          {loading ? (
            <div className="text-center py-16 text-text-muted">Loading...</div>
          ) : (
            <div className="bg-white rounded-xl border border-primary/10 overflow-hidden">
              <ProductTable
                products={products}
                onEdit={(p) => setMode({ type: "edit", product: p })}
                onDelete={handleDelete}
                deletingId={deletingId}
                onRequestDelete={setDeletingId}
              />
            </div>
          )}
        </>
      )}

      {mode.type === "create" && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary">Add Product</h2>
            <p className="text-sm text-text-muted mt-0.5">Fill in the details below.</p>
          </div>
          <div className="bg-white rounded-xl border border-primary/10 p-6">
            <ProductForm onSubmit={handleCreate} onCancel={() => setMode({ type: "list" })} />
          </div>
        </>
      )}

      {mode.type === "edit" && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary">Edit Product</h2>
            <p className="text-sm text-text-muted mt-0.5">
              Editing &ldquo;{mode.product.name}&rdquo;
            </p>
          </div>
          <div className="bg-white rounded-xl border border-primary/10 p-6">
            <ProductForm
              initial={mode.product}
              onSubmit={handleEdit}
              onCancel={() => setMode({ type: "list" })}
            />
          </div>
        </>
      )}
    </div>
  );
}
