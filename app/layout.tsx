import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://testvibecoding.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TestVibeCoding | Premium Home Decor",
    template: "%s | TestVibeCoding",
  },
  description: "Curating Elegance for Your Living Spaces",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TestVibeCoding",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "./",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TestVibeCoding",
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.png`,
  description: "Curating Elegance for Your Living Spaces",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1 (555) 123-4567",
    email: "hello@testvibecoding.com",
    contactType: "customer service",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "42 Elegance Avenue",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10013",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL,wght@0,400;1,400&display=swap"
          as="style"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="bg-background-light text-primary font-display">
        <LayoutShell>{children}</LayoutShell>
        <Script
          id="material-symbols-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var l = document.createElement('link');
              l.rel = 'stylesheet';
              l.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL,wght@0,400;1,400&display=swap';
              document.head.appendChild(l);
            `,
          }}
        />
      </body>
    </html>
  );
}
