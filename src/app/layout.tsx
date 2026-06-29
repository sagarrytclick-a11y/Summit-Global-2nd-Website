import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_IDENTITY } from "@/site-identity";
import { FormModalProvider } from "@/context/FormModalContext";
import FormModalViewport from "@/components/FormModalViewport";
import { QueryProvider } from "@/providers/QueryProvider";
import { JsonLd } from "@/components/JsonLd";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = "https://summitglobal.com";

export const metadata: Metadata = {
  title: {
    default: SITE_IDENTITY.meta.title,
    template: `%s | ${SITE_IDENTITY.name}`,
  },
  description: SITE_IDENTITY.meta.description,
  keywords: SITE_IDENTITY.meta.keywords,
  authors: [{ name: SITE_IDENTITY.meta.author }],
  creator: SITE_IDENTITY.meta.author,
  publisher: SITE_IDENTITY.meta.author,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    type: "website",
    siteName: SITE_IDENTITY.name,
    locale: "en_IN",
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} antialiased`}>
        <QueryProvider>
          <FormModalProvider>
            <JsonLd />
            {children}
            <FormModalViewport />
          </FormModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
