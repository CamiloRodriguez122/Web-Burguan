import type { Metadata } from "next";
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Burguan | Hamburguesas Artesanales Premium – Sincelejo",
  description:
    "Las mejores hamburguesas artesanales de Sincelejo. Carne premium, ingredientes frescos, sabor único. Delivery disponible. ¡Ordena por WhatsApp!",
  keywords: ["hamburguesas", "Sincelejo", "Burguan", "artesanales", "delivery", "comida", "granizados", "frozenshots"],
  openGraph: {
    title: "Burguan | Hamburguesas Artesanales Premium",
    description: "El placer de comer calle con estilo. Hamburguesas artesanales y Frozenshots Don Juan en Sincelejo.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} ${bebas.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
