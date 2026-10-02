/**
 * Single source of truth for company facts.
 * Only confirmed business details belong here. Do not add awards, reviews,
 * certifications, prices, opening hours or project counts unless supplied by the client.
 */
export const company = {
  name: "KN Construction and Builders",
  shortName: "KN",
  tagline: "Building Trust. Creating Foundations.",
  experience: "10+ years",
  phoneDisplay: "9611444777",
  phoneHref: "tel:+919611444777",
  whatsappDisplay: "+91 9611444777",
  whatsappHref: "https://wa.me/919611444777",
  /** Leave empty until a real email exists. Email links stay hidden while empty. */
  email: "",
  address: {
    street: "14, 8th Main Cross Rd, 4th Block, West Of Chord Road, 3rd Stage, Basaveshwar Nagar",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560079",
    country: "IN",
  },
  fullAddress:
    "14, 8th Main Cross Rd, 4th Block, West Of Chord Road, 3rd Stage, Basaveshwar Nagar, Bengaluru, Karnataka 560079",
  mapsUrl: "https://maps.app.goo.gl/asYfBJmT6tFUtFeu8",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export interface Service {
  slug: string;
  title: string;
  /** Value stored in the enquiries table and shown in the enquiry form. */
  enquiryValue: string;
  summary: string;
  icon: "building" | "file" | "boxes" | "hardhat" | "zap" | "hammer";
  points: string[];
  intro: string;
}

export const services: Service[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    enquiryValue: "Real Estate",
    summary: "Buying and selling land, with assistance through the property process.",
    icon: "building",
    points: ["Buying and selling land", "Property assistance"],
    intro:
      "Whether you are looking to buy land or sell it, we can talk through your requirements and assist you with the property process. Get in touch with the details of what you have in mind.",
  },
  {
    slug: "property-documentation",
    title: "Property Documentation",
    enquiryValue: "Property Documentation",
    summary: "Documentation assistance and support for property-related matters.",
    icon: "file",
    points: ["Documentation assistance", "Property-related support"],
    intro:
      "Property paperwork can be confusing. Tell us what you need and we will discuss how we can assist with documentation and property-related support.",
  },
  {
    slug: "building-materials",
    title: "Building Materials",
    enquiryValue: "Building Materials",
    summary: "Concrete blocks, bricks, M-sand, P-sand and aggregates.",
    icon: "boxes",
    points: ["Concrete blocks", "Bricks", "M-sand", "P-sand", "Aggregates"],
    intro:
      "We supply the materials that construction work depends on. Contact us with the material, quantity and delivery location to request a quotation.",
  },
  {
    slug: "construction",
    title: "Construction and Builders",
    enquiryValue: "Construction",
    summary: "Building construction and related construction services.",
    icon: "hardhat",
    points: ["Building construction", "Construction services"],
    intro:
      "From planning your requirement to building it, we offer construction services in and around Bengaluru. Share your plans and we will respond with a quotation.",
  },
  {
    slug: "electrical-plumbing",
    title: "Electrical and Plumbing",
    enquiryValue: "Electrical and Plumbing",
    summary: "Electrical work and plumbing services.",
    icon: "zap",
    points: ["Electrical work", "Plumbing services"],
    intro:
      "We take up electrical and plumbing work for buildings. Describe the job and we will get back to you with a quotation.",
  },
  {
    slug: "renovation",
    title: "Renovation",
    enquiryValue: "Renovation",
    summary: "Renovation and improvement work for existing buildings.",
    icon: "hammer",
    points: ["Renovation and improvement work"],
    intro:
      "If an existing building needs renovation or improvement, tell us what you want changed and we will discuss it and provide a quotation.",
  },
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: true },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const heroSlides = [
  {
    headline: "Homes and buildings, built on trust.",
    description: "Construction, renovation, and property services from a Bengaluru team with 10+ years of experience.",
  },
  {
    headline: "Construction you can speak to directly.",
    description: "Talk to us about your building requirement and get a quotation for the work.",
  },
  {
    headline: "Land and property, with guidance.",
    description: "Assistance with buying and selling land, plus property documentation support.",
  },
  {
    headline: "Building materials, ready to enquire.",
    description: "Concrete blocks, bricks, M-sand, P-sand and aggregates. Contact us for a quotation.",
  },
  {
    headline: "Renovation and improvement work.",
    description: "Electrical, plumbing and renovation services for existing buildings.",
  },
] as const;

export const whyChooseUs = [
  { title: "10+ years of experience", text: "A decade of work in construction and property services." },
  { title: "Multiple services, one team", text: "Construction, materials, documentation, real estate, electrical, plumbing and renovation." },
  { title: "Bengaluru presence", text: "Based in Basaveshwar Nagar, Bengaluru." },
  { title: "Direct communication", text: "Call or WhatsApp us and speak to the team directly." },
  { title: "Enquiry support", text: "Send an enquiry online and we will follow up with you." },
];
