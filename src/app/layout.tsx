import type { Metadata } from "next";
import { Archivo_Narrow, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LATHE_CUT_SYSTEMS | Analog Precision Cutting",
  description:
    "Hand-crafted sonic preservation through precision mechanical etching.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
