"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    label: "Overview",
    links: [
      { href: "/admin", label: "Dashboard", icon: "dashboard" },
    ],
  },
  {
    label: "Store",
    links: [
      { href: "/admin/products", label: "Products", icon: "inventory_2" },
      { href: "/admin/stock", label: "Stock", icon: "warehouse" },
      { href: "/admin/testimonials", label: "Testimonials", icon: "format_quote" },
    ],
  },
  {
    label: "Finance",
    links: [
      { href: "/admin/balance", label: "Balance", icon: "account_balance" },
      { href: "/admin/sales", label: "Sales", icon: "point_of_sale" },
      { href: "/admin/expenses", label: "Expenses", icon: "receipt_long" },
    ],
  },
  {
    label: "System",
    links: [
      { href: "/admin/settings", label: "Settings", icon: "settings" },
    ],
  },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-56 bg-background-dark text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
        <Link href="/admin" className="text-brand-gold text-xl font-extrabold tracking-tighter">
          TVC Admin
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
         aria-label="Close">
          <span aria-hidden="true" className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-3 mb-1.5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-gold/20 text-brand-gold"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-xl">{link.icon}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-lg">storefront</span>
          View Storefront
        </Link>
      </div>
    </aside>
  );
}
