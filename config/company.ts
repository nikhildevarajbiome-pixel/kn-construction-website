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

  // Call
  phoneDisplay: "9972200369",
  phoneHref: "tel:+919972200369",

  // WhatsApp
  whatsappDisplay: "+91 9686995996",
  whatsappHref: "https://wa.me/919686995996",

  // Email
  email: "knconstruction98@gmail.com",

  address: {
    street:
      "14, 8th Main Cross Rd, 4th Block, West Of Chord Road, 3rd Stage, Basaveshwar Nagar",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560079",
    country: "IN",
  },

  fullAddress:
    "14, 8th Main Cross Rd, 4th Block, West Of Chord Road, 3rd Stage, Basaveshwar Nagar, Bengaluru, Karnataka 560079",

  mapsUrl: "https://maps.app.goo.gl/asYfBJmT6tFUtFeu8",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export interface Service {
  slug: string;
  title: string;

  /** Value stored in the enquiries table and shown in the enquiry form. */
  enquiryValue: string;

  summary: string;

  icon:
    | "building"
    | "file"
    | "boxes"
    | "hardhat"
    | "zap"
    | "hammer";

  points: string[];
  intro: string;
}

export const services: Service[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    enquiryValue: "Real Estate",
    summary:
      "Buying and selling land, with assistance through the property process.",
    icon: "building",
    points: [
      "Buying and selling land",
      "Property assistance",
    ],
    intro:
      "Whether you are looking to buy land or sell it, we can talk through your requirements and assist you with the property process. Get in touch with the details of what you have in mind.",
  },

  {
    slug: "property-documentation",
    title: "Property Documentation",
    enquiryValue: "Property Documentation",
    summary:
      "Guidance and support through the property documentation process.",
    icon: "file",
    points: [
      "Documentation guidance",
      "Property-related paperwork support",
      "Process guidance",
    ],
    intro:
      "Property documentation can be confusing. We will guide you through the required documentation and help you understand the process involved in your property-related work.",
  },

  {
    slug: "building-materials",
    title: "Building Materials",
    enquiryValue: "Building Materials",
    summary:
      "Construction materials including RMC, concrete blocks, bricks, M-sand, P-sand and aggregates.",
    icon: "boxes",
    points: [
      "RMC (Ready-Mix Concrete)",
      "Concrete blocks",
      "Bricks",
      "M-sand",
      "P-sand",
      "Aggregates",
    ],
    intro:
      "We provide essential construction materials including RMC (Ready-Mix Concrete), concrete blocks, bricks, M-sand, P-sand and aggregates. Contact us with your requirements and delivery location.",
  },

  {
    slug: "construction",
    title: "Construction and Builders",
    enquiryValue: "Construction",
    summary:
      "Building construction and related construction services.",
    icon: "hardhat",
    points: [
      "Building construction",
      "Construction services",
    ],
    intro:
      "From planning your requirement to building it, we offer construction services in and around Bengaluru. Share your plans and we will respond with a quotation.",
  },

  {
    slug: "electrical-plumbing",
    title: "Electrical and Plumbing",
    enquiryValue: "Electrical and Plumbing",
    summary:
      "Electrical work and plumbing services.",
    icon: "zap",
    points: [
      "Electrical work",
      "Plumbing services",
    ],
    intro:
      "We take up electrical and plumbing work for buildings. Describe the job and we will get back to you with a quotation.",
  },

  {
    slug: "renovation",
    title: "Renovation",
    enquiryValue: "Renovation",
    summary:
      "Renovation and improvement work for existing buildings.",
    icon: "hammer",
    points: [
      "Renovation and improvement work",
    ],
    intro:
      "If an existing building needs renovation or improvement, tell us what you want changed and we will discuss it and provide a quotation.",
  },

  {
    slug: "interiors",
    title: "Interiors",
    enquiryValue: "Interiors",
    summary:
      "Interior work and finishing solutions for residential and commercial spaces.",
    icon: "hammer",
    points: [
      "Interior work",
      "Interior finishing",
      "Space planning",
      "Residential and commercial interiors",
    ],
    intro:
      "We take up interior work and finishing for residential and commercial spaces. Share your requirements with us and we will discuss the work and provide a quotation.",
  },

  {
    slug: "layout-formation",
    title: "Layout Formation",
    enquiryValue: "Layout Formation",
    summary:
      "Layout planning and formation guidance for property development.",
    icon: "building",
    points: [
      "Layout planning",
      "Layout formation",
      "Space utilization planning",
      "Development guidance",
    ],
    intro:
      "We provide guidance for layout planning and formation, helping you understand how your available space can be planned for development.",
  },
];

export const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
    children: true,
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;

export const heroSlides = [
  {
    headline: "Homes and buildings, built on trust.",
    description:
      "Construction, renovation, interiors, and property services from a Bengaluru team with 10+ years of experience.",
  },
  {
    headline: "Construction you can speak to directly.",
    description:
      "Talk to us about your building requirement and get a quotation for the work.",
  },
  {
    headline: "Land and property, with guidance.",
    description:
      "Assistance with buying and selling land, plus guidance through property documentation.",
  },
  {
    headline: "Building materials, ready to enquire.",
    description:
      "RMC, concrete blocks, bricks, M-sand, P-sand and aggregates. Contact us for a quotation.",
  },
  {
    headline: "Renovation, interiors and layout solutions.",
    description:
      "Renovation, interior work and layout formation guidance for your property requirements.",
  },
] as const;

export const whyChooseUs = [
  {
    title: "10+ years of experience",
    text: "A decade of work in construction and property services.",
  },
  {
    title: "Multiple services, one team",
    text:
      "Real estate, documentation guidance, materials, RMC, construction, interiors, layout formation, electrical, plumbing and renovation.",
  },
  {
    title: "Bengaluru presence",
    text: "Based in Basaveshwar Nagar, Bengaluru.",
  },
  {
    title: "Direct communication",
    text:
      "Call or WhatsApp us and speak to the team directly.",
  },
  {
    title: "Enquiry support",
    text:
      "Send an enquiry online and we will follow up with you.",
  },
];