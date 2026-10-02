import { MapPin, MessageCircle, Phone, ExternalLink } from "lucide-react";
import { company } from "@/config/company";
import { EnquiryForm } from "./EnquiryForm";

export function ContactSection({
  defaultService,
}: {
  defaultService?: string;
}) {
  return (
    <section
      id="enquiry"
      className="scroll-mt-20 bg-ivory py-12 sm:py-16 lg:py-20"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Get in touch
            </span>

            <h2 className="mt-3 text-4xl sm:text-5xl">
              Tell us what you need
            </h2>

            <p className="mt-4 text-grey">
              Send an enquiry, or reach us directly. We provide quotations
              on request.
            </p>

            <ul className="mt-7 space-y-5">

              {/* Phone */}
              <li className="flex gap-4">
                <Phone
                  className="mt-1 shrink-0 text-gold-dark"
                  size={20}
                  aria-hidden
                />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a
                    href={company.phoneHref}
                    className="text-grey underline-offset-4 hover:underline"
                  >
                    {company.phoneDisplay}
                  </a>
                </div>
              </li>

              {/* WhatsApp */}
              <li className="flex gap-4">
                <MessageCircle
                  className="mt-1 shrink-0 text-gold-dark"
                  size={20}
                  aria-hidden
                />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <a
                    href={company.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grey underline-offset-4 hover:underline"
                  >
                    {company.whatsappDisplay}
                  </a>
                </div>
              </li>

              {/* Address */}
              <li className="flex gap-4">
                <MapPin
                  className="mt-1 shrink-0 text-gold-dark"
                  size={20}
                  aria-hidden
                />
                <div>
                  <p className="font-semibold">Address</p>

                  <address className="mt-1 not-italic leading-relaxed text-grey">
                    {company.fullAddress}
                  </address>

                  <a
                    href={company.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark mt-3 inline-flex items-center gap-2"
                  >
                    <MapPin size={16} />
                    Get Directions
                    <ExternalLink size={14} />
                  </a>
                </div>
              </li>

              {/* Email */}
              {company.email && (
                <li>
                  <p className="font-semibold">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-grey"
                  >
                    {company.email}
                  </a>
                </li>
              )}
            </ul>

            {/* Google Maps */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gold/30 bg-[#101D2E] shadow-xl">
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="rounded-full bg-gold/15 p-2">
                  <MapPin className="text-gold" size={20} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Find Our Location
                  </p>
                  <p className="text-xs text-white/60">
                    Basaveshwar Nagar, Bengaluru
                  </p>
                </div>
              </div>

              <iframe
                title="KN Construction and Builders location on Google Maps"
                src="https://maps.google.com/maps?q=14%2C%208th%20Main%20Cross%20Rd%2C%204th%20Block%2C%20West%20Of%20Chord%20Road%2C%203rd%20Stage%2C%20Basaveshwar%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560079&output=embed"
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="px-5 py-4">
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-[#101D2E] transition hover:bg-white"
                >
                  Open Google Maps
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-3">
            <EnquiryForm defaultService={defaultService} />
          </div>

        </div>
      </div>
    </section>
  );
}