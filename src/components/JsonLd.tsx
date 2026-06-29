import { SITE_IDENTITY, getFullAddress } from "@/site-identity"

const BASE_URL = "https://summitglobal.com"

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_IDENTITY.name,
    url: BASE_URL,
    logo: `${BASE_URL}${SITE_IDENTITY.assets.logo.main}`,
    description: SITE_IDENTITY.meta.description,
    foundingDate: SITE_IDENTITY.business.established.toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_IDENTITY.contact.address.office,
      addressLocality: SITE_IDENTITY.contact.address.city,
      addressCountry: SITE_IDENTITY.contact.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_IDENTITY.contact.phone.raw,
        contactType: "customer service",
        email: SITE_IDENTITY.contact.email.support,
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      SITE_IDENTITY.contact.socials.facebook,
      SITE_IDENTITY.contact.socials.instagram,
      SITE_IDENTITY.contact.socials.linkedin,
      SITE_IDENTITY.contact.socials.twitter,
      SITE_IDENTITY.contact.socials.youtube,
    ].filter(Boolean),
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_IDENTITY.name,
    url: BASE_URL,
    description: SITE_IDENTITY.meta.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_IDENTITY.name,
    description: SITE_IDENTITY.meta.description,
    url: BASE_URL,
    telephone: SITE_IDENTITY.contact.phone.raw,
    email: SITE_IDENTITY.contact.email.support,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_IDENTITY.contact.address.office,
      addressLocality: SITE_IDENTITY.contact.address.city,
      addressCountry: SITE_IDENTITY.contact.address.country,
    },
    areaServed: "IN",
    serviceType: SITE_IDENTITY.business.services,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
