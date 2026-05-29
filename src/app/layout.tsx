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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600;700&family=Fira+Code:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Courier+Prime&family=Geist+Mono&display=swap"
        />
      </head>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
