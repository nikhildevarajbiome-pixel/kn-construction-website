import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { ContactSection } from "@/components/ContactSection";
import { PageHeader } from "@/components/PageHeader";
import { company, services } from "@/config/company";
import { images } from "@/config/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = services.find((x) => x.slug === params.slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: `${service.title} from ${company.name}, Bengaluru. ${service.summary} Contact us for a quotation.`,
    openGraph: {
      title: `${service.title} | ${company.name}`,
      description: service.summary,
    },
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const img = images.services[service.slug];

  return (
    <>
      <PageHeader
        title={service.title}
        intro={service.summary}
      />

      <section className="section">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2">
          {/* Service Content */}
          <div>
            <p className="text-lg leading-relaxed text-grey">
              {service.intro}
            </p>

            <h2 className="mt-10 text-3xl">
              What this covers
            </h2>

            <ul className="mt-4 space-y-3">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3"
                >
                  <Check
                    className="mt-0.5 shrink-0 text-gold-dark"
                    size={20}
                    aria-hidden
                  />

                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 border-l-2 border-gold pl-4 text-grey">
              We do not publish fixed prices. Send us the details
              of your requirement and we will provide a quotation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(
                  service.enquiryValue
                )}#enquiry`}
                className="btn btn-navy"
              >
                Request a quotation
              </Link>

              <a
                href={company.phoneHref}
                className="btn btn-outline-dark"
              >
                Call {company.phoneDisplay}
              </a>

              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Service Image */}
          {img && (
            <div className="relative aspect-[4/3] overflow-hidden bg-navy">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <ContactSection
        defaultService={service.enquiryValue}
      />
    </>
  );
}