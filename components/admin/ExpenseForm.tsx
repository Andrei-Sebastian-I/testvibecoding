"use client";

import { useState } from "react";
import type { Expense } from "@/lib/admin/expenses-store";
import { inputClass } from "@/lib/admin/shared";

const categories = ["Materials", "Shipping", "Marketing", "Rent", "Utilities", "Equipment", "Other"];

export default function ExpenseForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Expense;
  onSave: () => Promise<void>;
  onCancel: () => void;
}) {
  const [description, setDescription] = useState(initial?.description ?? "");
  const [amount, setAmount] = useState(initial?.amount?.toString() ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = initial ? `/api/admin/expenses/${initial.id}` : "/api/admin/expenses";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount: Number(amount), category, date }),
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
          {initial ? "Edit Expense" : "Add Expense"}
        </h2>
      </div>
      <div className="bg-white rounded-xl border border-primary/10 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Description *
              </label>
              <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="What was this expense for?" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Amount *
              </label>
              <input className={inputClass} type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input className={inputClass} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-brand-gold text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all disabled:opacity-50 cursor-pointer">
              {saving ? "Saving..." : initial ? "Update Expense" : "Add Expense"}
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
