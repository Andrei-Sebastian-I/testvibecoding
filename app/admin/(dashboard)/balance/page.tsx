"use client";

import { useEffect, useState, useMemo } from "react";
import type { Sale } from "@/lib/admin/sales-store";
import type { Expense } from "@/lib/admin/expenses-store";

const periods = [
  { label: "1M", months: 1 },
  { label: "3M", months: 3 },
  { label: "6M", months: 6 },
  { label: "9M", months: 9 },
  { label: "12M", months: 12 },
  { label: "All", months: 0 },
] as const;

function cutoffDate(months: number): string {
  if (months === 0) return "1970-01-01";
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString().slice(0, 10);
}

export default function BalancePage() {
  const [allSales, setAllSales] = useState<Sale[]>([]);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonths, setSelectedMonths] = useState(0); // 0 = all

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/sales").then((r) => r.json()),
      fetch("/api/admin/expenses").then((r) => r.json()),
    ]).then(([s, e]) => {
      setAllSales(s);
      setAllExpenses(e);
      setLoading(false);
    });
  }, []);

  const cutoff = useMemo(() => cutoffDate(selectedMonths), [selectedMonths]);

  const sales = useMemo(
    () => allSales.filter((s) => s.date >= cutoff),
    [allSales, cutoff]
  );
  const expenses = useMemo(
    () => allExpenses.filter((e) => e.date >= cutoff),
    [allExpenses, cutoff]
  );

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalRevenue - totalExpenses;

  const transactions = useMemo(
    () =>
      [
        ...sales.map((s) => ({
          id: `sale-${s.id}`,
          date: s.date,
          description: `${s.productName} (x${s.quantity})`,
          detail: s.customer || "—",
          amount: s.total,
          type: "income" as const,
        })),
        ...expenses.map((e) => ({
          id: `expense-${e.id}`,
          date: e.date,
          description: e.description,
          detail: e.category || "Other",
          amount: e.amount,
          type: "expense" as const,
        })),
      ].sort((a, b) => b.date.localeCompare(a.date)),
    [sales, expenses]
  );

  if (loading) {
    return <div className="text-center py-16 text-text-muted">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary">Balance</h2>
          <p className="text-sm text-text-muted mt-0.5">
            Financial overview of your business.
          </p>
        </div>

        {/* Period selector */}
        <div className="flex bg-white rounded-lg border border-primary/10 p-1 gap-0.5">
          {periods.map((p) => (
            <button
              key={p.label}
              onClick={() => setSelectedMonths(p.months)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                selectedMonths === p.months
                  ? "bg-brand-gold text-white"
                  : "text-text-muted hover:text-primary hover:bg-primary/5"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-primary/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-700">trending_up</span>
            </div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Revenue
            </p>
          </div>
          <p className="text-2xl font-bold text-green-700">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {sales.length} sale{sales.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-primary/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-red-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600">trending_down</span>
            </div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Expenses
            </p>
          </div>
          <p className="text-2xl font-bold text-red-600">
            ${totalExpenses.toLocaleString()}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className={`rounded-xl border p-5 ${
          balance >= 0
            ? "bg-green-50/50 border-green-200"
            : "bg-red-50/50 border-red-200"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`size-10 rounded-lg flex items-center justify-center ${
              balance >= 0 ? "bg-green-100" : "bg-red-100"
            }`}>
              <span className={`material-symbols-outlined ${
                balance >= 0 ? "text-green-700" : "text-red-600"
              }`}>
                account_balance
              </span>
            </div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Net Balance
            </p>
          </div>
          <p className={`text-2xl font-bold ${
            balance >= 0 ? "text-green-700" : "text-red-600"
          }`}>
            {balance >= 0 ? "+" : "-"}${Math.abs(balance).toLocaleString()}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {balance >= 0 ? "Profit" : "Loss"}
          </p>
        </div>
      </div>

      {/* Transaction history */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
          Transaction History
        </h3>
        <p className="text-xs text-text-muted">
          {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <span className="material-symbols-outlined text-5xl mb-4 block">receipt_long</span>
          <p className="text-lg font-medium">No transactions in this period</p>
          <p className="text-sm mt-1">Try selecting a longer time range.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-primary/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary/10 text-xs uppercase tracking-wider text-text-muted">
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold w-full">Description</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Type</th>
                <th className="py-3 px-4 font-semibold text-right whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-primary/5 hover:bg-primary/[0.02] transition-colors">
                  <td className="py-3 px-4 text-sm text-text-muted whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-semibold text-primary">{t.description}</p>
                    <p className="text-xs text-text-muted">{t.detail}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      t.type === "income"
                        ? "text-green-700 bg-green-50"
                        : "text-red-600 bg-red-50"
                    }`}>
                      {t.type === "income" ? "Sale" : "Expense"}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-right text-sm font-semibold ${
                    t.type === "income" ? "text-green-700" : "text-red-600"
                  }`}>
                    {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
