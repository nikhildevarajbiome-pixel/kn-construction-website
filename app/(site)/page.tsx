import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { Gallery } from "@/components/Gallery";
import { HeroSlider } from "@/components/HeroSlider";
import { ServiceCard } from "@/components/ServiceCard";
import { company, services, whyChooseUs } from "@/config/company";
import { images } from "@/config/images";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSlider />

      {/* About Section */}
      <section className="bg-ivory py-6 sm:py-8 lg:py-10">
        <div className="container-x grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-navy">
            <Image
              src={images.about.src}
              alt={images.about.alt}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />

            <div className="absolute -bottom-px -right-px bg-ivory px-5 py-3 font-serif text-xl text-navy sm:px-6 sm:py-4 sm:text-2xl">
              {company.experience}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A98548] sm:text-xs">
              Who We Are
            </p>

            <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight text-[#101D2E] sm:text-4xl lg:text-5xl">
              Building Trust Through Experience
            </h2>

            <div className="mt-5 h-px w-16 bg-[#C6A66B]" />

            <p className="mt-5 text-sm leading-7 text-grey sm:mt-6 sm:text-base sm:leading-8">
              {company.name} has {company.experience} of experience in
              construction and property services in Bengaluru. We work across
              building construction, materials supply, real estate, property
              documentation, electrical and plumbing, and renovation.
            </p>

            <p className="mt-4 text-sm leading-7 text-grey sm:text-base sm:leading-8">
              You deal with us directly: call, message on WhatsApp, or send an
              enquiry and we will follow up.
            </p>

            <Link href="/about" className="btn btn-navy mt-7">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative overflow-hidden bg-[#F7F5F0] py-6 sm:py-8 lg:py-10">
        <div className="container-x">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A98548] sm:text-xs">
                What We Do
              </p>

              <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight text-[#101D2E] sm:text-4xl lg:text-5xl">
                Services Built Around
                <span className="block text-[#A98548]">
                  Your Property Needs
                </span>
              </h2>

              <div className="mt-4 h-px w-16 bg-[#C6A66B]" />
            </div>

            <p className="max-w-md text-sm leading-7 text-[#737B86] sm:text-base">
              Six service areas. Prices are not fixed: contact us with your
              requirement for a quotation.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((s, index) => (
              <div
                key={s.slug}
                className="group relative overflow-hidden border border-[#E8E3D9] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A66B]/60 hover:shadow-[0_18px_45px_rgba(16,29,46,0.09)] sm:p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-serif text-sm text-[#B89455]">
                    0{index + 1}
                  </span>

                  <span className="h-px w-12 bg-[#C6A66B]/50 transition-all duration-500 group-hover:w-20 group-hover:bg-[#C6A66B]" />
                </div>

                <div className="relative z-10">
                  <ServiceCard service={s} />
                </div>

                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#C6A66B]/[0.06] transition-transform duration-500 group-hover:scale-150" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-[#101D2E] px-7 py-3 text-sm font-semibold text-[#101D2E] transition-all duration-300 hover:bg-[#101D2E] hover:text-white"
            >
              Explore All Services
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-[#101D2E] py-14 text-white sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C6A66B]/[0.06] blur-3xl" />

        <div className="container-x relative">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C6A66B] sm:text-xs">
              Our Approach
            </p>

            <h2 className="font-serif text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
              Why Choose Us
            </h2>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {whyChooseUs.map((w, index) => (
              <div
                key={w.title}
                className="group border-t border-[#C6A66B]/50 pt-6 transition-colors duration-300 hover:border-[#C6A66B]"
              >
                <span className="font-serif text-xs tracking-wider text-[#C6A66B]">
                  0{index + 1}
                </span>

                <dt className="mt-5 font-serif text-xl leading-snug text-[#C6A66B] transition-colors duration-300 group-hover:text-[#E0C58F] sm:text-2xl">
                  {w.title}
                </dt>

                <dd className="mt-3 max-w-md text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                  {w.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="bg-ivory pt-12 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10">
        <div className="container-x">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A98548] sm:text-xs">
            Our Work
          </p>

          <h2 className="font-serif text-3xl font-medium text-[#101D2E] sm:text-4xl lg:text-5xl">
            Project Gallery
          </h2>

          <p className="mt-4 mb-8 max-w-2xl text-sm leading-7 text-grey sm:mb-10 sm:text-base">
            Explore our construction and property gallery.
          </p>

          <Gallery limit={6} />

          <Link
            href="/projects"
            className="btn btn-outline-dark mt-6 sm:mt-8"
          >
            View All Projects
          </Link>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </>
  );
}