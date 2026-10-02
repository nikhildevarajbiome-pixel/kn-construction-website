import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Projects",
  description: `Project gallery for ${company.name}. Placeholder images are shown until real project photographs are supplied.`,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" intro="Our project gallery. The images below are placeholders and will be replaced with real project photographs." />
      <section className="section">
        <div className="container-x">
          <Gallery />
        </div>
      </section>
    </>
  );
}
