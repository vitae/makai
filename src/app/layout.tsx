import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makai Goods Co. 🌊",
  description:
    "Hawaii Ocean Shop — premium beachside goods with a sunset vibe. Buy direct with Stripe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
