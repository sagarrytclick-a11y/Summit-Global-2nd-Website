import type { Metadata } from "next"
import ExamsPageClient from "./ExamsPageClient"

export const metadata: Metadata = {
  title: "Exams - MBBS Abroad & Study Abroad Entrance Tests",
  description: "Explore entrance exams for MBBS abroad and study abroad programs. Find details on exam patterns, schedules, conducting bodies, and preparation tips.",
  openGraph: {
    title: "Exams - MBBS Abroad & Study Abroad Entrance Tests | Summit Global",
    description: "Explore entrance exams for MBBS abroad and study abroad programs.",
    url: "https://summitglobal.com/exams",
  },
  twitter: {
    title: "Exams - MBBS Abroad & Study Abroad Entrance Tests | Summit Global",
    description: "Explore entrance exams for MBBS abroad and study abroad programs.",
  },
  alternates: {
    canonical: "https://summitglobal.com/exams",
  },
}

export default function ExamsPage() {
  return <ExamsPageClient />
}
