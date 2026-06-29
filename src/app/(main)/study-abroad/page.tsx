import type { Metadata } from "next"
import StudyAbroadPageClient from "./StudyAbroadPageClient"

export const metadata: Metadata = {
  title: "Study Abroad - Global Universities & Programs",
  description: "Discover study abroad opportunities at top international universities. Get guidance on admissions, visas, scholarships, and program selection for global education.",
  openGraph: {
    title: "Study Abroad - Global Universities & Programs | Summit Global",
    description: "Discover study abroad opportunities at top international universities.",
    url: "https://summitglobal.com/study-abroad",
  },
  twitter: {
    title: "Study Abroad - Global Universities & Programs | Summit Global",
    description: "Discover study abroad opportunities at top international universities.",
  },
  alternates: {
    canonical: "https://summitglobal.com/study-abroad",
  },
}

export default function StudyAbroadPage() {
  return <StudyAbroadPageClient />
}
