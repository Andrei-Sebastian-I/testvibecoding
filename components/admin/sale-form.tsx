"use client";

import { useState } from "react";
import type { Sale } from "@/lib/admin/sales-store";
import { inputClass } from "./form-styles";

export default function SaleForm({
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
