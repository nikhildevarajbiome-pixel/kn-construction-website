import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { company } from "@/config/company";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-serif", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: `${company.name} | ${company.tagline}`, template: `%s | ${company.name}` },
  description: `${company.name}: real estate, property documentation, building materials, construction, electrical and plumbing, and renovation in Bengaluru. ${company.experience} of experience.`,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    title: company.name,
    description: company.tagline,
  },
};

export const viewport: Viewport = { themeColor: "#101D2E", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
