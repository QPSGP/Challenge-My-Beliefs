import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

import "./globals.css";

export const metadata: Metadata = {
  title: "Challenge My Beliefs",
  description:
    "A platform for testing beliefs against objective reality with contextual honesty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
