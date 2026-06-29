import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Us - MBBS Abroad & Study Abroad Consultancy",
  description: "Summit Global helps students with MBBS abroad and study abroad admissions, university selection, visa guidance, and career counselling since 2005.",
  openGraph: {
    title: "About Summit Global - MBBS Abroad & Study Abroad Consultancy",
    description: "Premier consultancy for MBBS abroad and study abroad admissions at top international universities.",
    url: "https://summitglobal.com/about",
  },
  twitter: {
    title: "About Summit Global - MBBS Abroad & Study Abroad Consultancy",
    description: "Premier consultancy for MBBS abroad and study abroad admissions at top international universities.",
  },
  alternates: {
    canonical: "https://summitglobal.com/about",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
