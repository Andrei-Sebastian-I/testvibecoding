"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { useAdminSW } from "@/hooks/use-admin-sw";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useAdminSW();

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-56">
        <AdminHeader onMenuToggle={() => setSidebarOpen(true)} />
        <div className="flex-1 p-4 sm:p-8 bg-background-light overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
