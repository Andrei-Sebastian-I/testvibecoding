"use client";

import { useEffect, useState, useCallback } from "react";
import type { StockEntry } from "@/lib/admin/stock-store";

const stockLevelClass = (stock: number) => {
  if (stock === 0) return "text-red-600 bg-red-50";
  if (stock <= 5) return "text-amber-600 bg-amber-50";
  return "text-green-700 bg-green-50";
};

const stockLabel = (stock: number) => {
  if (stock === 0) return "Out of stock";
  if (stock <= 5) return "Low stock";
  return "In stock";
};

export default function StockPage() {
  const [entries, setEntries] = useState<StockEntry[]>([]);
  const [edited, setEdited] = useState<Map<number, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchStock = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stock");
      if (res.ok) setEntries(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  function handleChange(productId: number, value: string) {
    const num = Math.max(0, parseInt(value) || 0);
    setEdited(new Map(edited).set(productId, num));
    setSaved(false);
  }

  async function handleSave() {
    if (edited.size === 0) return;
    setSaving(true);
    setSaved(false);
    try {
      const updates = Array.from(edited.entries()).map(
        ([productId, stock]) => ({ productId, stock })
      );
      const res = await fetch("/api/admin/stock", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      if (res.ok) {
        setEntries(await res.json());
        setEdited(new Map());
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  const totalItems = entries.reduce(
    (sum, e) => sum + (edited.get(e.productId) ?? e.stock),
    0
  );
  const outOfStock = entries.filter(
    (e) => (edited.get(e.productId) ?? e.stock) === 0
  ).length;
  const lowStock = entries.filter((e) => {
    const s = edited.get(e.productId) ?? e.stock;
    return s > 0 && s <= 5;
  }).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary">Stock Management</h2>
          <p className="text-sm text-text-muted mt-0.5">
            Manage inventory levels for your products.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">
                check_circle
              </span>
              Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || edited.size === 0}
            className="flex items-center gap-2 bg-brand-gold text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all disabled:opacity-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">save</span>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-primary/10 p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Total Items
          </p>
          <p className="text-2xl font-bold text-primary mt-1">{totalItems}</p>
        </div>
        <div className="bg-white rounded-xl border border-primary/10 p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Low Stock
          </p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{lowStock}</p>
        </div>
        <div className="bg-white rounded-xl border border-primary/10 p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Out of Stock
          </p>
          <p className="text-2xl font-bold text-red-600 mt-1">{outOfStock}</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-muted">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl border border-primary/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary/10 text-xs uppercase tracking-wider text-text-muted">
                <th className="py-3 px-4 font-semibold w-full">Product</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const currentStock =
                  edited.get(entry.productId) ?? entry.stock;
                const isEdited = edited.has(entry.productId);
                return (
                  <tr
                    key={entry.productId}
                    className="border-b border-primary/5 hover:bg-primary/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <p className="font-semibold text-sm text-primary">
                        {entry.productName}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stockLevelClass(
                          currentStock
                        )}`}
                      >
                        {stockLabel(currentStock)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <input
                        type="number"
                        min="0"
                        value={currentStock}
                        onChange={(e) =>
                          handleChange(entry.productId, e.target.value)
                        }
                        className={`w-20 px-2 py-1.5 rounded-lg border text-sm text-right font-semibold transition-colors ${
                          isEdited
                            ? "border-brand-gold bg-brand-gold/5"
                            : "border-primary/15 bg-white"
                        } focus:outline-none focus:ring-2 focus:ring-brand-gold/40`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
