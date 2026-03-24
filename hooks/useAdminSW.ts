"use client";

import { useEffect } from "react";

export function useAdminSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/admin-sw.js", { scope: "/admin" })
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);
}
