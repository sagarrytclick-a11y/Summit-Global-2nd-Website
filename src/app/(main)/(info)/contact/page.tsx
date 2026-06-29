import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us - MBBS Abroad & Study Abroad Consultancy",
  description: "Get in touch with Summit Global for MBBS abroad and study abroad counselling. Call, email, or visit our office for university admissions guidance.",
  openGraph: {
    title: "Contact Summit Global - MBBS Abroad & Study Abroad Consultancy",
    description: "Get in touch with Summit Global for MBBS abroad and study abroad counselling.",
    url: "https://summitglobal.com/contact",
  },
  twitter: {
    title: "Contact Summit Global - MBBS Abroad & Study Abroad Consultancy",
    description: "Get in touch with Summit Global for MBBS abroad and study abroad counselling.",
  },
  alternates: {
    canonical: "https://summitglobal.com/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
