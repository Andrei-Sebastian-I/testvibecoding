"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import type { Sale } from "@/lib/admin/sales-store";
import type { Expense } from "@/lib/admin/expenses-store";
import type { Product } from "@/lib/products";
import type { StockEntry } from "@/lib/admin/stock-store";
import SummaryCard from "@/components/admin/summary-card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ── helpers ── */
function monthLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function monthKey(dateStr: string) {
  return dateStr.slice(0, 7); // "2025-03"
}

const PIE_COLORS = ["#C8A962", "#1B3A2D", "#6B8F71", "#D4A853", "#A3C9A8", "#8B6914"];

export default function AdminDashboardPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stock, setStock] = useState<StockEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/sales").then((r) => r.json()),
      fetch("/api/admin/expenses").then((r) => r.json()),
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/stock").then((r) => r.json()),
    ]).then(([s, e, p, st]) => {
      setSales(s);
      setExpenses(e);
      setProducts(p);
      setStock(st);
      setLoading(false);
    });
  }, []);

  /* ── computed data ── */
  const totalRevenue = useMemo(() => sales.reduce((s, v) => s + v.total, 0), [sales]);
  const totalExpenses = useMemo(() => expenses.reduce((s, v) => s + v.amount, 0), [expenses]);
  const netProfit = totalRevenue - totalExpenses;
  const totalOrders = sales.length;
  const lowStockCount = useMemo(() => stock.filter((s) => s.stock <= 3).length, [stock]);

  // Monthly revenue vs expenses
  const monthlyData = useMemo(() => {
    const map = new Map<string, { revenue: number; expenses: number }>();

    sales.forEach((s) => {
      const key = monthKey(s.date);
      const entry = map.get(key) ?? { revenue: 0, expenses: 0 };
      entry.revenue += s.total;
      map.set(key, entry);
    });

    expenses.forEach((e) => {
      const key = monthKey(e.date);
      const entry = map.get(key) ?? { revenue: 0, expenses: 0 };
      entry.expenses += e.amount;
      map.set(key, entry);
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, data]) => ({
        month: monthLabel(key + "-01"),
        revenue: data.revenue,
        expenses: data.expenses,
        profit: data.revenue - data.expenses,
      }));
  }, [sales, expenses]);

  // Top products by revenue
  const topProducts = useMemo(() => {
    const map = new Map<string, { revenue: number; quantity: number }>();
    sales.forEach((s) => {
      const entry = map.get(s.productName) ?? { revenue: 0, quantity: 0 };
      entry.revenue += s.total;
      entry.quantity += s.quantity;
      map.set(s.productName, entry);
    });
    return Array.from(map.entries())
      .map(([name, data]) => ({ name: name.length > 18 ? name.slice(0, 16) + "..." : name, fullName: name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [sales]);

  // Expenses by category
  const expensesByCategory = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  // Recent transactions (last 5)
  const recentTransactions = useMemo(() => {
    const all = [
      ...sales.map((s) => ({
        id: `s-${s.id}`,
        date: s.date,
        description: `${s.productName} (x${s.quantity})`,
        amount: s.total,
        type: "income" as const,
      })),
      ...expenses.map((e) => ({
        id: `e-${e.id}`,
        date: e.date,
        description: e.description,
        amount: e.amount,
        type: "expense" as const,
      })),
    ];
    return all.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  }, [sales, expenses]);

  if (loading) {
    return <div className="text-center py-16 text-text-muted">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary">Dashboard</h2>
        <p className="text-sm text-text-muted mt-0.5">
          Overview of your business performance.
        </p>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <SummaryCard
          icon="trending_up"
          iconBg="bg-green-50"
          iconColor="text-green-700"
          label="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          valueColor="text-green-700"
        />
        <SummaryCard
          icon="trending_down"
          iconBg="bg-red-50"
          iconColor="text-red-600"
          label="Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          valueColor="text-red-600"
        />
        <SummaryCard
          icon="account_balance"
          iconBg={netProfit >= 0 ? "bg-green-50" : "bg-red-50"}
          iconColor={netProfit >= 0 ? "text-green-700" : "text-red-600"}
          label="Net Profit"
          value={`${netProfit >= 0 ? "+" : "-"}$${Math.abs(netProfit).toLocaleString()}`}
          valueColor={netProfit >= 0 ? "text-green-700" : "text-red-600"}
        />
        <SummaryCard
          icon="shopping_bag"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Total Orders"
          value={String(totalOrders)}
          valueColor="text-primary"
        />
        <SummaryCard
          icon="warning"
          iconBg={lowStockCount > 0 ? "bg-amber-50" : "bg-green-50"}
          iconColor={lowStockCount > 0 ? "text-amber-600" : "text-green-700"}
          label="Low Stock"
          value={String(lowStockCount)}
          valueColor={lowStockCount > 0 ? "text-amber-600" : "text-green-700"}
          sub={lowStockCount > 0 ? "Items need restock" : "All stocked"}
        />
      </div>

      {/* ── Charts Row 1: Revenue vs Expenses ── */}
      <div className="bg-white rounded-xl border border-primary/10 p-4 sm:p-5 mb-6 overflow-hidden">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
          Monthly Revenue vs Expenses
        </h3>
        <div className="h-72 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `$${v}`} />
              <Tooltip
                formatter={(value?: number | string) => `$${Number(value ?? 0).toLocaleString()}`}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }}
              />
              <Legend wrapperStyle={{ fontSize: "13px" }} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#16a34a"
                strokeWidth={2}
                fill="url(#gradRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#dc2626"
                strokeWidth={2}
                fill="url(#gradExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Charts Row 2: Top Products + Expenses by Category ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-primary/10 p-4 sm:p-5 overflow-hidden">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
            Top Products by Revenue
          </h3>
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `$${v}`} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  stroke="#9ca3af"
                  width={90}
                />
                <Tooltip
                  formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`, "Revenue"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }}
                />
                <Bar dataKey="revenue" fill="#C8A962" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="bg-white rounded-xl border border-primary/10 p-4 sm:p-5 overflow-hidden">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
            Expenses by Category
          </h3>
          <div className="h-72 w-full min-w-0 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                >
                  {expensesByCategory.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }}
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "11px" }}
                  formatter={(value: string) => <span className="text-primary/70">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Monthly Profit ── */}
      <div className="bg-white rounded-xl border border-primary/10 p-4 sm:p-5 mb-6 overflow-hidden">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
          Monthly Profit
        </h3>
        <div className="h-56 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `$${v}`} />
              <Tooltip
                formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`, "Profit"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }}
              />
              <Bar dataKey="profit" radius={[4, 4, 0, 0]} barSize={28}>
                {monthlyData.map((entry, index) => (
                  <Cell key={index} fill={entry.profit >= 0 ? "#16a34a" : "#dc2626"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="bg-white rounded-xl border border-primary/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-primary/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
            Recent Transactions
          </h3>
          <Link
            href="/admin/balance"
            className="text-xs font-semibold text-brand-gold hover:underline"
          >
            View All
          </Link>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-primary/10 text-xs uppercase tracking-wider text-text-muted">
              <th className="py-3 px-3 sm:px-5 font-semibold">Date</th>
              <th className="py-3 px-3 sm:px-5 font-semibold w-full">Description</th>
              <th className="py-3 px-3 sm:px-5 font-semibold text-right whitespace-nowrap">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-primary/5 last:border-b-0 hover:bg-primary/[0.02] transition-colors"
              >
                <td className="py-3 px-3 sm:px-5 text-sm text-text-muted whitespace-nowrap">
                  {new Date(t.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3 px-3 sm:px-5 text-sm font-semibold text-primary">
                  {t.description}
                </td>
                <td
                  className={`py-3 px-5 text-right text-sm font-semibold whitespace-nowrap ${
                    t.type === "income" ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
