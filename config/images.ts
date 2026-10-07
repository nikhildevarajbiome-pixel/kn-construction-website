/**
 * Central image configuration
 * KN Construction and Builders
 */

export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {
  // Homepage hero slider
  hero: [
    {
      src: "/images/a.jpg",
      alt: "Construction and building development",
    },
    {
      src: "/images/b.jpg",
      alt: "Modern building architecture",
    },
    {
      src: "/images/c.jpg",
      alt: "Residential property",
    },
    {
      src: "/images/d.jpg",
      alt: "Building construction",
    },
    {
      src: "/images/e.jpg",
      alt: "Construction project",
    },
  ] as SiteImage[],

  // About section
  about: {
    src: "/images/f.jpg",
    alt: "Construction professional working on a building project",
  } as SiteImage,

  // Services
  services: {
    "real-estate": {
      src: "/images/real-estate.jpg",
      alt: "Residential real estate property",
    },

    "property-documentation": {
      src: "/images/property-documentation.jpg",
      alt: "Property documentation and paperwork",
    },

    "building-materials": {
      src: "/images/building-materials.jpg",
      alt: "Concrete blocks and building materials",
    },

    construction: {
      src: "/images/construction.jpg",
      alt: "Building construction work",
    },

    "electrical-plumbing": {
      src: "/images/j.jpg",
      alt: "Electrical and plumbing services",
    },

    renovation: {
      src: "/images/renovation.jpg",
      alt: "Interior renovation and improvement work",
    },

    interiors: {
      src: "/images/interiors.jpg",
      alt: "Modern interior work and finishing",
    },

    "layout-formation": {
      src: "/images/layout-formation.jpg",
      alt: "Layout planning and property development plan",
    },
  } as Record<string, SiteImage>,

  // Project Gallery
  // Includes images representing all services
  gallery: [
    {
      src: "/images/real-estate.jpg",
      alt: "Residential real estate property",
      category: "Real Estate",
    },
    {
      src: "/images/property-documentation.jpg",
      alt: "Property documentation and paperwork",
      category: "Property Documentation",
    },
    {
      src: "/images/building-materials.jpg",
      alt: "Concrete blocks and building materials",
      category: "Building Materials",
    },
    {
      src: "/images/construction.jpg",
      alt: "Building construction work",
      category: "Construction",
    },
    {
      src: "/images/j.jpg",
      alt: "Electrical and plumbing services",
      category: "Electrical & Plumbing",
    },
    {
      src: "/images/renovation.jpg",
      alt: "Renovation and improvement work",
      category: "Renovation",
    },
    {
      src: "/images/interiors.jpg",
      alt: "Modern interior work and finishing",
      category: "Interiors",
    },
    {
      src: "/images/layout-formation.jpg",
      alt: "Layout planning and property development",
      category: "Layout Formation",
    },
  ] as (SiteImage & { category: string })[],
};

export const galleryCategories = [
  "Real Estate",
  "Property Documentation",
  "Building Materials",
  "Construction",
  "Electrical & Plumbing",
  "Renovation",
  "Interiors",
  "Layout Formation",
] as const;