import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oracle Boxing Courses | Premium Boxing Training",
  description: "Access premium boxing courses, coaching replays, and the complete Boxing from First Principles system. Learn from expert coaches Oliver & Toni.",
  keywords: "boxing courses, boxing training, online boxing, boxing from first principles, boxing coaching, oracle boxing",
  authors: [{ name: "Oracle Boxing" }],
  creator: "Oracle Boxing",
  publisher: "Oracle Boxing",
  metadataBase: new URL('https://courses.oracleboxing.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://media.oracleboxing.com/Website/favicon.png',
  },
  openGraph: {
    title: "Oracle Boxing Courses | Premium Boxing Training",
    description: "Access premium boxing courses, coaching replays, and the complete Boxing from First Principles system.",
    url: 'https://courses.oracleboxing.com',
    siteName: 'Oracle Boxing Courses',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
