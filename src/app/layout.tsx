import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_IDENTITY } from "@/site-identity";
import { FormModalProvider } from "@/context/FormModalContext";
import { FormModal } from "@/components/FormModal";
import { QueryProvider } from "@/providers/QueryProvider";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_IDENTITY.meta.title,
  description: SITE_IDENTITY.meta.description,
   keywords: SITE_IDENTITY.meta.keywords,
  authors: [{ name: SITE_IDENTITY.meta.author }],
  creator: SITE_IDENTITY.meta.author,
  publisher: SITE_IDENTITY.meta.author,
  metadataBase: new URL("https://timesabroad.com"),
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    type: "website",
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  icons: {
    icon: "/favicon.png"
  },
  manifest: "/manifest.json",
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
            {children}
            <FormModal />
          </FormModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
