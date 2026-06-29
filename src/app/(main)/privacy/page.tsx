import type { Metadata } from "next"
import PrivacyPageClient from "./PrivacyPageClient"

export const metadata: Metadata = {
  title: "Privacy Policy - Summit Global",
  description: "Review the Summit Global privacy policy. Learn how we collect, use, and protect your personal information when you use our MBBS abroad and study abroad services.",
  openGraph: {
    title: "Privacy Policy | Summit Global",
    description: "Review how Summit Global collects, uses, and protects your personal information.",
    url: "https://summitglobal.com/privacy",
  },
  alternates: {
    canonical: "https://summitglobal.com/privacy",
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
