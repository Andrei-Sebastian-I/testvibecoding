"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { FavoritesProvider } from "@/lib/favorites-context";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <FavoritesProvider>
      <Navbar />
      <main className={isHome ? "" : "pt-20"}>{children}</main>
      <Footer />
    </FavoritesProvider>
  );
}
