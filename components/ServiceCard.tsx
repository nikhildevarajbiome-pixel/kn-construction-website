import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/company";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col border border-navy/10 bg-white p-8 transition-colors hover:border-gold">
      <ServiceIcon name={service.icon} size={32} className="text-gold-dark" strokeWidth={1.5} />
      <h3 className="mt-6 text-3xl">{service.title}</h3>
      <p className="mt-3 text-grey">{service.summary}</p>
      <ul className="mt-5 space-y-1.5 border-t border-navy/10 pt-5 text-sm">
        {service.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <Link href={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 pt-2 text-sm font-semibold text-navy underline-offset-4 hover:underline">
        Learn more about {service.title.toLowerCase()} <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
