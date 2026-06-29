import type { Metadata } from "next"
import LoginPageClient from "./LoginPageClient"

export const metadata: Metadata = {
  title: "Admin Login - Summit Global",
  description: "Admin login page for Summit Global website management.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://summitglobal.com/login",
  },
}

export default function LoginPage() {
  return <LoginPageClient />
}
