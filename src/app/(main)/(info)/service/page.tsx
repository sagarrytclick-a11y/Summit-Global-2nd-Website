import type { Metadata } from "next"
import ServicePageClient from "./ServicePageClient"

export const metadata: Metadata = {
  title: "Our Services - MBBS Abroad & Study Abroad Guidance",
  description: "Comprehensive study abroad services including university admissions, visa assistance, test preparation, scholarships, and career counselling for MBBS abroad students.",
  openGraph: {
    title: "Our Services - MBBS Abroad & Study Abroad Guidance | Summit Global",
    description: "Comprehensive study abroad services including university admissions, visa assistance, test preparation, scholarships, and career counselling.",
    url: "https://summitglobal.com/service",
  },
  twitter: {
    title: "Our Services - MBBS Abroad & Study Abroad Guidance | Summit Global",
    description: "Comprehensive study abroad services including university admissions, visa assistance, test preparation, scholarships, and career counselling.",
  },
  alternates: {
    canonical: "https://summitglobal.com/service",
  },
}

export default function ServicePage() {
  return <ServicePageClient />
}
