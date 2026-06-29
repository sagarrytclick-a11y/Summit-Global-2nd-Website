import type { Metadata } from "next"
import TermsPageClient from "./TermsPageClient"

export const metadata: Metadata = {
  title: "Terms & Conditions - Summit Global",
  description: "Review the terms and conditions for using Summit Global's website and MBBS abroad and study abroad counselling services.",
  openGraph: {
    title: "Terms & Conditions | Summit Global",
    description: "Review the terms and conditions for using Summit Global's website and services.",
    url: "https://summitglobal.com/term",
  },
  alternates: {
    canonical: "https://summitglobal.com/term",
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
