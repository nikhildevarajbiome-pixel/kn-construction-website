import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">{children}</main>

      <Footer />

      <JsonLd />
    </>
  );
}