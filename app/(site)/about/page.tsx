import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { company, services, whyChooseUs } from "@/config/company";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${company.name}: ${company.experience} of experience in construction, property and building services in Bengaluru.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Building Trust Through Experience"
        intro={`${company.name} has ${company.experience} of experience serving customers in Bengaluru.`}
      />

      <section className="relative overflow-hidden bg-[#101D2E] py-16 sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C6A66B]/10 blur-3xl" />

        <div className="container-x relative">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C6A66B]">
                Who We Are
              </p>

              <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
                More Than Construction.
                <span className="block text-[#C6A66B]">
                  A Foundation of Trust.
                </span>
              </h2>

              <div className="mt-7 h-px w-20 bg-[#C6A66B]" />

              <div className="mt-8 space-y-5 text-sm leading-8 text-white/70 sm:text-base">
                <p>
                  {company.name} is based in Basaveshwar Nagar, Bengaluru.
                  Over {company.experience}, we have offered a range of
                  services that customers need when they build, buy, maintain
                  or improve a property.
                </p>

                <p>
                  Our services include{" "}
                  {services.map((s) => s.title.toLowerCase()).join(", ")}.
                  Having these under one roof means you can speak to one team
                  about your requirement.
                </p>

                <p>
                  We keep communication direct. You can call, WhatsApp or send
                  an enquiry, and we will respond with a quotation for the
                  work.
                </p>
              </div>

              <Link
                href="/contact#enquiry"
                className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 bg-[#C6A66B] px-7 py-3 text-sm font-semibold text-[#101D2E] transition duration-300 hover:bg-[#D8BD88]"
              >
                Request a Quotation
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 border border-[#C6A66B]/30" />

              <div className="relative bg-[#172B45] p-6 sm:p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A66B]">
                  Why Choose Us
                </p>

                <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">
                  Built Around Your Needs
                </h3>

                <div className="mt-7 space-y-0">
                  {whyChooseUs.map((w, index) => (
                    <div
                      key={w.title}
                      className="border-t border-white/10 py-6 last:border-b"
                    >
                      <div className="flex gap-4">
                        <span className="font-serif text-sm text-[#C6A66B]">
                          0{index + 1}
                        </span>

                        <div>
                          <h4 className="font-serif text-xl text-white">
                            {w.title}
                          </h4>

                          <p className="mt-2 text-sm leading-7 text-white/60">
                            {w.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}