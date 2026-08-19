import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kriel Colon & Beauty Spa",
  description: "Kriel Colon & Beauty Spa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
