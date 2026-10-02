import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { company, services } from "@/config/company";

export const metadata: Metadata = {
  title: "Services",
  description: `Services from ${company.name}: real estate, property documentation, building materials, construction, electrical and plumbing, and renovation.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our services"
        intro="Construction, property and building services under one roof. Contact us for a quotation."
      />

      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
    </>
  );
}