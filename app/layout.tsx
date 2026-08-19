import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.address}`,
  description:
    "Colon hydrotherapy, body treatments, and facials in Kriel, Mpumalanga. Book your appointment today.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
