import type { Metadata } from "next"
import MbbsAbroadPageClient from "./MbbsAbroadPageClient"

export const metadata: Metadata = {
  title: "MBBS Abroad - Top Medical Universities & Colleges",
  description: "Explore MBBS abroad programs at top medical universities. Compare destinations, fees, rankings, and admission requirements for international medical education.",
  openGraph: {
    title: "MBBS Abroad - Top Medical Universities & Colleges | Summit Global",
    description: "Explore MBBS abroad programs at top medical universities worldwide.",
    url: "https://summitglobal.com/mbbs-abroad",
  },
  twitter: {
    title: "MBBS Abroad - Top Medical Universities & Colleges | Summit Global",
    description: "Explore MBBS abroad programs at top medical universities worldwide.",
  },
  alternates: {
    canonical: "https://summitglobal.com/mbbs-abroad",
  },
}

export default function MbbsAbroadPage() {
  return <MbbsAbroadPageClient />
}
