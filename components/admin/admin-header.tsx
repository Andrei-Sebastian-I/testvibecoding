"use client";

import { useRouter } from "next/navigation";
import { useInstallPrompt } from "@/hooks/use-install-prompt";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const router = useRouter();
  const { canInstall, install } = useInstallPrompt();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="h-16 bg-white border-b border-primary/10 flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
         aria-label="Menu">
          <span aria-hidden="true" className="material-symbols-outlined text-xl">menu</span>
        </button>
        <h1 className="text-lg font-bold text-primary">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        {canInstall && (
          <button
            onClick={install}
            className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors cursor-pointer"
            title="Install app"
            aria-label="Install app"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-lg">install_mobile</span>
            <span className="hidden sm:inline">Install</span>
          </button>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors cursor-pointer"
          aria-label="Log out"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-lg">logout</span>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
