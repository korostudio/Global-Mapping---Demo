import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import TopBarWrapper from "@/components/TopBarWrapper";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const BASE_URL = "https://globalmapping.biz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Global Mapping - Demo",
    template: "%s | Global Mapping - Demo",
  },

  description:
    "Más de 25 años brindando servicios de LiDAR aerotransportado, topografía, fotogrametría y geomática en Perú y Latinoamérica. ISO 9001:2015.",

  keywords: [
    "LiDAR aerotransportado",
    "topografía",
    "fotogrametría",
    "geomática",
    "geodesia",
    "supervisión topográfica",
    "diseño de ingeniería",
    "GIS",
    "cartografía",
    "Perú",
    "Latinoamérica",
    "ISO 9001",
  ],

  authors: [{ name: "Global Mapping SAC", url: BASE_URL }],

  creator: "Global Mapping SAC",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: BASE_URL,
    siteName: "Global Mapping SAC",
    title: "Global Mapping - Demo",
    description:
      "Más de 25 años brindando servicios de LiDAR aerotransportado, topografía, fotogrametría y geomática en Perú y Latinoamérica. ISO 9001:2015.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Global Mapping SAC – Geomática de precisión",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Global Mapping - Demo",
    description:
      "Más de 25 años brindando servicios de LiDAR aerotransportado, topografía, fotogrametría y geomática en Perú y Latinoamérica.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${barlow.variable} ${barlowCondensed.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <TopBarWrapper />
        {children}
      </body>
    </html>
  );
}
