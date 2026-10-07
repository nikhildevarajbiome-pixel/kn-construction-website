import Link from "next/link";
import { company, services } from "@/config/company";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#101D2E] text-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C6A66B]/[0.06] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-400/[0.04] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#C6A66B]/40 bg-white/[0.04] shadow-lg shadow-black/10 transition-colors group-hover:border-[#C6A66B]">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#C6A66B]">
                  KN
                </span>
              </div>

              <div>
                <p className="font-serif text-xl font-semibold tracking-wide text-white">
                  Construction
                </p>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#C6A66B]">
                  & Builders
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Building Trust. Creating Foundations. With over 10 years of
              experience, we provide construction, property, and building
              material solutions in Bengaluru.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C6A66B]/25 bg-[#C6A66B]/[0.07] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6A66B]" />

              <span className="text-xs font-medium tracking-wide text-[#D8C19B]">
                10+ Years of Experience
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Explore
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#C6A66B]" />

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#C6A66B]"
                  >
                    <span className="h-px w-0 bg-[#C6A66B] transition-all duration-300 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Our Services
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#C6A66B]" />

            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-[#C6A66B]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C6A66B]" />

                    <span className="transition-colors group-hover:text-[#C6A66B]">
                      {service.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Get In Touch
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#C6A66B]" />

            <div className="space-y-5">
              {/* Phone */}
              <a
                href={company.phoneHref}
                className="group flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#C6A66B] transition-colors group-hover:border-[#C6A66B]/40 group-hover:bg-[#C6A66B]/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.08 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69A2 2 0 0 1 22 16.92Z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs text-white/40">Call Us</p>

                  <p className="mt-1 text-sm font-medium text-white transition-colors group-hover:text-[#C6A66B]">
                    +91 99722 00369
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#C6A66B] transition-colors group-hover:border-[#C6A66B]/40 group-hover:bg-[#C6A66B]/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.5 9.5c.4 2.1 2 3.7 4.1 4.1l1.2-1.2 2.2 1.1c-.2 1-1 1.6-2 1.6-3.5 0-6.6-3.1-6.6-6.6 0-1 .6-1.8 1.6-2l1.1 2.2-1.6.8Z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs text-white/40">WhatsApp</p>

                  <p className="mt-1 text-sm font-medium text-white transition-colors group-hover:text-[#C6A66B]">
                    +91 96869 95996
                  </p>
                </div>
              </a>

              {/* Email */}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="group flex items-start gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#C6A66B] transition-colors group-hover:border-[#C6A66B]/40 group-hover:bg-[#C6A66B]/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3 7 9 6 9-6"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs text-white/40">Email</p>

                    <p className="mt-1 break-all text-sm font-medium text-white transition-colors group-hover:text-[#C6A66B]">
                      {company.email}
                    </p>
                  </div>
                </a>
              )}

              {/* Address */}
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#C6A66B] transition-colors group-hover:border-[#C6A66B]/40 group-hover:bg-[#C6A66B]/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                    />

                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs text-white/40">
                    Visit Us
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70 transition-colors group-hover:text-[#C6A66B]">
                    {company.fullAddress}
                  </p>
                </div>
              </a>
            </div>

            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-[#C6A66B]/50 pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A66B] transition-colors hover:border-white hover:text-white"
            >
              Get Directions
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-center text-xs text-white/45 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} KN Construction & Builders. All
            rights reserved.
          </p>

          <p className="tracking-wide">
            Building Trust. Creating Foundations.
          </p>

          <p className="text-white/50">
            Designed &amp; Deployed by{" "}
            <a
              href="mailto:nikhildmdevraj@gmail.com"
              className="font-semibold text-[#C6A66B] transition-colors hover:text-white"
            >
              Nikhil Devaraj
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}