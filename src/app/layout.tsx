import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-menu",
  subsets: ["latin", "cyrillic"],
});

const TITLE = "Beach Santa — пляжний бар у Хотянівці";
const DESCRIPTION =
  "Меню пляжного бару Beach Santa у Хотянівці: безалкогольні та алкогольні коктейлі, лимонади, пиво, снеки.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "uk_UA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2e6e70",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">{children}</body>
    </html>
  );
}
