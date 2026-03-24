"use client";

import { useEffect, useState, useCallback } from "react";
import type { Sale } from "@/lib/admin/sales-store";

type Mode = { type: "list" } | { type: "create" } | { type: "edit"; sale: Sale };

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [loading, setLoading] = useState(true);

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
    if (!confirm("Delete this sale?")) return;
    const res = await fetch(`/api/admin/sales/${id}`, { method: "DELETE" });
    if (res.ok) await fetchSales();
  }

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalUnits = sales.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div>
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
              <span className="material-symbols-outlined text-lg">add</span>
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
              <span className="material-symbols-outlined text-5xl mb-4 block">point_of_sale</span>
              <p className="text-lg font-medium">No sales recorded</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-primary/10 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-primary/10 text-xs uppercase tracking-wider text-text-muted">
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold w-full">Product</th>
                    <th className="py-3 px-4 font-semibold whitespace-nowrap">Customer</th>
                    <th className="py-3 px-4 font-semibold text-right whitespace-nowrap">Qty</th>
                    <th className="py-3 px-4 font-semibold text-right whitespace-nowrap">Total</th>
                    <th className="py-3 px-4 font-semibold text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((sale) => (
                      <tr key={sale.id} className="border-b border-primary/5 hover:bg-primary/[0.02] transition-colors">
                        <td className="py-3 px-4 text-sm text-text-muted whitespace-nowrap">
                          {new Date(sale.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm font-semibold text-primary">{sale.productName}</p>
                          <p className="text-xs text-text-muted">${sale.unitPrice} each</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-primary whitespace-nowrap">{sale.customer || "—"}</td>
                        <td className="py-3 px-4 text-right text-sm font-medium">{sale.quantity}</td>
                        <td className="py-3 px-4 text-right text-sm font-semibold text-green-700">
                          +${sale.total.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setMode({ type: "edit", sale })}
                              className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(sale.id)}
                              className="p-1.5 rounded-md text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
          )}
        </>
      )}

      {(mode.type === "create" || mode.type === "edit") && (
        <SaleForm
          initial={mode.type === "edit" ? mode.sale : undefined}
          onSave={async () => {
            await fetchSales();
            setMode({ type: "list" });
          }}
          onCancel={() => setMode({ type: "list" })}
        />
      )}
    </div>
  );
}

function SaleForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Sale;
  onSave: () => Promise<void>;
  onCancel: () => void;
}) {
  const [productName, setProductName] = useState(initial?.productName ?? "");
  const [quantity, setQuantity] = useState(initial?.quantity?.toString() ?? "1");
  const [unitPrice, setUnitPrice] = useState(initial?.unitPrice?.toString() ?? "");
  const [customer, setCustomer] = useState(initial?.customer ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);

  const computedTotal = (Number(quantity) || 0) * (Number(unitPrice) || 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = initial ? `/api/admin/sales/${initial.id}` : "/api/admin/sales";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          quantity: Number(quantity),
          unitPrice: Number(unitPrice),
          customer,
          date,
        }),
      });
      if (res.ok) await onSave();
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary">
          {initial ? "Edit Sale" : "Record Sale"}
        </h2>
      </div>
      <div className="bg-white rounded-xl border border-primary/10 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Product Name *</label>
              <input className={inputClass} value={productName} onChange={(e) => setProductName(e.target.value)} required placeholder="Product sold" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Customer</label>
              <input className={inputClass} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Unit Price *</label>
              <input className={inputClass} type="number" min="0" step="0.01" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Quantity *</label>
              <input className={inputClass} type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Date</label>
              <input className={inputClass} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="flex items-end">
              <div className="w-full bg-green-50 rounded-lg px-4 py-2.5 border border-green-200">
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wider">Total</p>
                <p className="text-lg font-bold text-green-700">${computedTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-brand-gold text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all disabled:opacity-50 cursor-pointer">
              {saving ? "Saving..." : initial ? "Update Sale" : "Record Sale"}
            </button>
            <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-text-muted hover:text-primary border border-primary/10 hover:border-primary/20 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
