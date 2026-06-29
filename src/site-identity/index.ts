// src/site-identity/index.ts
import { SITE_ASSETS } from './assets';

export interface SiteIdentity {
  name: string;
  shortName: string;
  description: string;
  tagline?: string;
  domain: string;
  brand: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  contact: {
    phone: {
      display: string;
      raw: string;
      additional?: string[];
    };
    email: {
      support: string;
      admissions: string;
      general?: string;
    };
    address: {
      office: string;
      city: string;
      country: string;
      mapLink?: string;
    };
    socials: {
      whatsapp: string;
      instagram: string;
      linkedin: string;
      facebook?: string;
      twitter?: string;
      youtube?: string;
    };
  };
  assets: {
    logo: {
      main: string;
      favicon: string;
      appleTouchIcon: string;
    };
    icons: {
      icon192: string;
      icon512: string;
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogImage?: string;
  };
  business: {
    established: number;
    type: string;
    services: string[];
  };
}

export const SITE_IDENTITY: SiteIdentity = {
  name: "Summit Global",
  shortName: "Summit Global",
  description: "Premier consultancy for MBBS and study abroad admissions at top international universities",
  tagline: "Your Gateway to Global Education",
  domain: "summitglobal.com",
  brand: {
    primaryColor: "#0b1f63",
    secondaryColor: "#ffffff",
    accentColor: "#F59E0B",
  },
  contact: {
    phone: {
      display: "+91 97738 62945",
      raw: "+919773862945",
      additional: ["+91 97735 23880"]
    },
    email: {
      support: "summitfoundationglobal@gmail.com",
 admissions: "summitfoundationglobal@gmail.com",
 general: "summitfoundationglobal@gmail.com",
    },
    address: {
      office: "Wave Silver Tower, Unit No- 415, 4th Floor, Noida Sector-18",
      city: "Noida",
      country: "Uttar Pradesh 201301",
      mapLink: "https://goo.gl/maps/example",
    },
    socials: {
      whatsapp: "https://wa.me/919773862945",
      instagram: "https://instagram.com/summitglobal",
      linkedin: "https://linkedin.com/company/summitglobal",
      facebook: "https://facebook.com/summitglobal",
      twitter: "https://x.com/summitglobal",
      youtube: "https://youtube.com/@summitglobal",
    },
  },
  assets: SITE_ASSETS,
  meta: {
    title: "Summit Global - Your Gateway to Global Education",
    description: "Premier consultancy for MBBS and study abroad admissions at top international universities. Expert counseling, university admissions, and career guidance.",
    keywords: [
      "mbbs abroad",
      "study abroad",
      "medical education abroad",
      "university admissions",
      "career counseling",
      "study abroad consultancy",
      "international universities"
    ],
    author: "Summit Global",
    ogImage: "/logo.svg",
  },
  business: {
    established: 2020,
    type: "Education Services",
    services: [
      "MBBS Abroad Admissions",
      "Study Abroad Guidance",
      "University Admissions",
      "Career Counseling",
      "Visa Assistance"
    ],
  },
};

// Export individual sections for convenience
export const { name, contact, brand, assets, meta } = SITE_IDENTITY;

// Helper functions
export const getFullAddress = () =>
  `${SITE_IDENTITY.contact.address.office}, ${SITE_IDENTITY.contact.address.city}, ${SITE_IDENTITY.contact.address.country}`;

export const getMetaTags = () => ({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords.join(", "),
  author: meta.author,
  "og:title": meta.title,
  "og:description": meta.description,
  "og:image": meta.ogImage,
  "og:type": "website",
});

export const getManifestData = () => ({
  name: SITE_IDENTITY.name,
  short_name: SITE_IDENTITY.shortName,
  description: SITE_IDENTITY.description,
  start_url: "/",
  display: "standalone",
  background_color: SITE_IDENTITY.brand.secondaryColor,
  theme_color: SITE_IDENTITY.brand.primaryColor,
  icons: [
    {
      src: SITE_IDENTITY.assets.icons.icon192,
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: SITE_IDENTITY.assets.icons.icon512,
      sizes: "512x512",
      type: "image/svg+xml",
    },
  ],
});
