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
    alt: "Building and construction",
  } as SiteImage,

  // Services
  services: {
    "real-estate": {
      src: "/images/g.jpg",
      alt: "Real estate and property",
    },

    "property-documentation": {
      src: "/images/h.jpg",
      alt: "Property documentation",
    },

    "building-materials": {
      src: "/images/i.jpg",
      alt: "Building materials",
    },

    construction: {
      src: "/images/a.jpg",
      alt: "Construction site",
    },

    "electrical-plumbing": {
      src: "/images/j.jpg",
      alt: "Electrical and plumbing services",
    },

    renovation: {
      src: "/images/f.jpg",
      alt: "Building renovation",
    },
  } as Record<string, SiteImage>,

  // Project gallery
  gallery: [
    {
      src: "/images/a.jpg",
      alt: "Construction project",
      category: "Construction",
    },
    {
      src: "/images/b.jpg",
      alt: "Residential project",
      category: "Residential",
    },
    {
      src: "/images/c.jpg",
      alt: "Building development",
      category: "Construction",
    },
    {
      src: "/images/d.jpg",
      alt: "Building project",
      category: "Residential",
    },
    {
      src: "/images/e.jpg",
      alt: "Construction work",
      category: "Construction",
    },
    {
      src: "/images/f.jpg",
      alt: "Renovation project",
      category: "Renovation",
    },
    {
      src: "/images/g.jpg",
      alt: "Property project",
      category: "Residential",
    },
    {
      src: "/images/h.jpg",
      alt: "Building materials project",
      category: "Materials",
    },
  ] as (SiteImage & { category: string })[],
};

export const galleryCategories = [
  "Residential",
  "Construction",
  "Renovation",
  "Materials",
] as const;