import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { PageHeader } from "@/components/PageHeader";
import { company } from "@/config/company";
import { SERVICE_OPTIONS } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${company.name} in Basaveshwar Nagar, Bengaluru. Call ${company.phoneDisplay}, WhatsApp, or send an enquiry.`,
};

export default function ContactPage({ searchParams }: { searchParams: { service?: string } }) {
  const preset = searchParams.service && SERVICE_OPTIONS.includes(searchParams.service) ? searchParams.service : "";
  return (
    <>
      <PageHeader title="Contact us" intro="Call, message on WhatsApp, visit us, or send an enquiry below." />
      <ContactSection defaultService={preset} />
    </>
  );
}
