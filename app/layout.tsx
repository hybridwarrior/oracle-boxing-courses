import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oracle Boxing Shop | Premium Boxing Courses & Training",
  description: "Shop premium boxing courses, coaching replays, and the complete Boxing from First Principles system. Learn from expert coaches Oliver & Toni.",
  keywords: "boxing courses, boxing training, online boxing, boxing from first principles, boxing coaching, oracle boxing, boxing shop",
  authors: [{ name: "Oracle Boxing" }],
  creator: "Oracle Boxing",
  publisher: "Oracle Boxing",
  metadataBase: new URL('https://shop.oracleboxing.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://media.oracleboxing.com/Website/favicon.png',
  },
  openGraph: {
    title: "Oracle Boxing Shop | Premium Boxing Courses",
    description: "Shop premium boxing courses, coaching replays, and the complete Boxing from First Principles system.",
    url: 'https://shop.oracleboxing.com',
    siteName: 'Oracle Boxing Shop',
    locale: 'en_US',
    type: 'website',
  },
};

import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { Toaster } from "sonner";
import { UTMTracker } from "@/components/UTMTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <UTMTracker />
        <CurrencyProvider>
          <CartProvider>
            {children}
            <Toaster position="top-center" />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
