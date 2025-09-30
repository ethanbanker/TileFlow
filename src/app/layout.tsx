import "../app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TileFlow",
  description: "A JS-config, Next.js-powered self-hosted dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}

