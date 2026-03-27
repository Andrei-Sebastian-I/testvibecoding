"use client";

import { useEffect, useState, useCallback } from "react";
import type { Sale } from "@/lib/admin/sales-store";
import SaleForm from "@/components/admin/sale-form";
import FeedbackToast from "@/components/admin/feedback-toast";

type Mode = { type: "list" } | { type: "create" } | { type: "edit"; sale: Sale };

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sales");
      if (res.ok) setSales(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/sales/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchSales();
      setFeedback({ type: "success", message: "Sale deleted" });
    } else {
      setFeedback({ type: "error", message: "Failed to delete sale" });
    }
  }

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalUnits = sales.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div>
      <FeedbackToast feedback={feedback} onDismiss={() => setFeedback(null)} />
      {mode.type === "list" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary">Sales</h2>
              <p className="text-sm text-text-muted mt-0.5">
                {sales.length} sale{sales.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setMode({ type: "create" })}
              className="flex items-center gap-2 bg-brand-gold text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all cursor-pointer"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-lg">add</span>
              Record Sale
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-primary/10 p-4">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-bold text-green-700 mt-1">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl border border-primary/10 p-4">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Units Sold</p>
              <p className="text-2xl font-bold text-primary mt-1">{totalUnits}</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-text-muted">Loading...</div>
          ) : sales.length === 0 ? (
            <div className="text-center py-16 text-text-muted">
              <span aria-hidden="true" className="material-symbols-outlined text-5xl mb-4 block">point_of_sale</span>
              <p className="text-lg font-medium">No sales recorded</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-primary/10 overflow-x-auto">
              <table className="w-full text-left min-w-0">
                <thead>
                  <tr className="border-b border-primary/10 text-xs uppercase tracking-wider text-text-muted">
                    <th className="py-3 px-3 sm:px-4 font-semibold">Date</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold w-full">Product</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold whitespace-nowrap hidden sm:table-cell">Customer</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold text-right whitespace-nowrap">Qty</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold text-right whitespace-nowrap">Total</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold text-right whitespace-nowrap hidden sm:table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((sale) => (
                      <tr key={sale.id} className="border-b border-primary/5 hover:bg-primary/[0.02] transition-colors">
                        <td className="py-3 px-3 sm:px-4 text-sm text-text-muted whitespace-nowrap">
                          {new Date(sale.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </td>
                        <td className="py-3 px-3 sm:px-4">
                          <p className="text-sm font-semibold text-primary">{sale.productName}</p>
                          <p className="text-xs text-text-muted">${sale.unitPrice} each</p>
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-sm text-primary whitespace-nowrap hidden sm:table-cell">{sale.customer || "—"}</td>
                        <td className="py-3 px-3 sm:px-4 text-right text-sm font-medium">{sale.quantity}</td>
                        <td className="py-3 px-3 sm:px-4 text-right text-sm font-semibold text-green-700 whitespace-nowrap">
                          +${sale.total.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-right hidden sm:table-cell">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setMode({ type: "edit", sale })}
                              className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                            >
                              <span aria-hidden="true" className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            {deletingId === sale.id ? (
                              <>
                                <button
                                  onClick={() => { handleDelete(sale.id); setDeletingId(null); }}
                                  className="px-2 py-1 rounded-md text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeletingId(null)}
                                  className="px-2 py-1 rounded-md text-xs font-semibold text-text-muted hover:text-primary transition-colors cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setDeletingId(sale.id)}
                                className="p-1.5 rounded-md text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                <span aria-hidden="true" className="material-symbols-outlined text-lg">delete</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {(mode.type === "create" || mode.type === "edit") && (
        <SaleForm
          initial={mode.type === "edit" ? mode.sale : undefined}
          onSave={async () => {
            await fetchSales();
            setMode({ type: "list" });
            setFeedback({ type: "success", message: mode.type === "create" ? "Sale recorded" : "Sale updated" });
          }}
          onCancel={() => setMode({ type: "list" })}
        />
      )}
    </div>
  );
}
