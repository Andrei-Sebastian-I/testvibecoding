import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#1c1a16",
};

export const metadata: Metadata = {
  title: "Admin | TestVibeCoding",
  manifest: "/admin-manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TVC Admin",
  },
  icons: {
    apple: "/icons/admin-icon-192.png",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
