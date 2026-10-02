import { company } from "@/config/company";

/** LocalBusiness structured data. Confirmed facts only: no ratings, hours, awards or images. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    url: company.siteUrl,
    telephone: "+919611444777",
    slogan: company.tagline,
    hasMap: company.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    ...(company.email ? { email: company.email } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
