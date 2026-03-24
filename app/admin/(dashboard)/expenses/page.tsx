"use client";

import { useEffect, useState, useCallback } from "react";
import type { Expense } from "@/lib/admin/expenses-store";

type Mode = { type: "list" } | { type: "create" } | { type: "edit"; expense: Expense };

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-primary/15 bg-white text-sm text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors";

const categories = ["Materials", "Shipping", "Marketing", "Rent", "Utilities", "Equipment", "Other"];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [loading, setLoading] = useState(true);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/expenses");
      if (res.ok) setExpenses(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  async function handleDelete(id: number) {
    if (!confirm("Delete this expense?")) return;
    const res = await fetch(`/api/admin/expenses/${id}`, { method: "DELETE" });
    if (res.ok) await fetchExpenses();
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category || "Other"] = (acc[e.category || "Other"] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <div>
      {mode.type === "list" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary">Expenses</h2>
              <p className="text-sm text-text-muted mt-0.5">
                Total: <span className="font-semibold text-primary">${total.toLocaleString()}</span>
              </p>
            </div>
            <button
              onClick={() => setMode({ type: "create" })}
              className="flex items-center gap-2 bg-brand-gold text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-gold/90 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Add Expense
            </button>
          </div>

          {/* Category breakdown */}
          {Object.keys(byCategory).length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.entries(byCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, amount]) => (
                  <div key={cat} className="bg-white rounded-lg border border-primary/10 px-4 py-2.5">
                    <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">{cat}</p>
                    <p className="text-sm font-bold text-primary mt-0.5">${amount.toLocaleString()}</p>
                  </div>
                ))}
            </div>
          )}

          {loading ? (
            <div className="text-center py-16 text-text-muted">Loading...</div>
          ) : expenses.length === 0 ? (
            <div className="text-center py-16 text-text-muted">
              <span className="material-symbols-outlined text-5xl mb-4 block">receipt_long</span>
              <p className="text-lg font-medium">No expenses recorded</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-primary/10 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-primary/10 text-xs uppercase tracking-wider text-text-muted">
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold w-full">Description</th>
                    <th className="py-3 px-4 font-semibold whitespace-nowrap">Category</th>
                    <th className="py-3 px-4 font-semibold text-right whitespace-nowrap">Amount</th>
                    <th className="py-3 px-4 font-semibold text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((expense) => (
                      <tr key={expense.id} className="border-b border-primary/5 hover:bg-primary/[0.02] transition-colors">
                        <td className="py-3 px-4 text-sm text-text-muted whitespace-nowrap">
                          {new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm font-semibold text-primary">{expense.description}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs font-medium bg-primary/5 text-primary px-2 py-1 rounded-md">
                            {expense.category || "Other"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-semibold text-red-600">
                          -${expense.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setMode({ type: "edit", expense })}
                              className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(expense.id)}
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
        <ExpenseForm
          initial={mode.type === "edit" ? mode.expense : undefined}
          onSave={async () => {
            await fetchExpenses();
            setMode({ type: "list" });
          }}
          onCancel={() => setMode({ type: "list" })}
        />
      )}
    </div>
  );
}

function ExpenseForm({
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
