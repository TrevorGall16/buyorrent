import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RentOrBuy-Pro - Buy vs Rent Calculator",
  description: "Compare buying vs renting with real market data for 500+ cities. Make informed financial decisions.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://rentorbuy-pro.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
