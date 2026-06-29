'use client'

import { useContactInfo } from '@/hooks/useContactInfo'
import { SITE_IDENTITY } from '@/site-identity'
import { BadgeCheck, FileText, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'

export default function TermsAndConditionsPage() {
  const contactInfo = useContactInfo()

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                <FileText className="h-3.5 w-3.5" />
                Legal Terms
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Terms & Conditions
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
                Review the terms that govern how you use {SITE_IDENTITY.name} and access our MBBS Abroad, Study Abroad, counselling, and content services.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-950">Terms</p>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Website usage & service scope</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'Website use must remain lawful and responsible',
              'Admissions and visas remain subject to third-party decisions',
              'Content and branding cannot be reused without permission',
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <TermsBlock
              title="1. Acceptance of Terms"
              content={`By accessing or using ${SITE_IDENTITY.name}'s website or services, you agree to comply with these Terms & Conditions. If you do not agree, you should discontinue use of our services.`}
            />

            <TermsBlock
              title="2. Scope of Services"
              content={`${SITE_IDENTITY.name} provides education counseling and informational services related to colleges, universities, exams, and study destinations. Final admissions, visas, and academic decisions are made by the respective institutions and authorities.`}
            />

            <TermsBlock
              title="3. Use of Website"
              content={
                <ul className="list-disc pl-6 space-y-3">
                  <li>You agree to use the website only for lawful purposes</li>
                  <li>You must not attempt to misuse, copy, or disrupt the website</li>
                  <li>Content may not be reused without written permission</li>
                </ul>
              }
            />

            <TermsBlock
              title="4. Accuracy of Information"
              content={`While we strive to maintain accurate and updated information, ${SITE_IDENTITY.name} does not guarantee completeness or real-time accuracy of details related to institutions, fees, policies, or immigration requirements.`}
            />

            <TermsBlock
              title="5. Counseling Disclaimer"
              content="All guidance provided is based on experience, student inputs, and available information. Outcomes such as admissions and visas are subject to third-party decisions beyond our control."
            />

            <TermsBlock
              title="6. Intellectual Property"
              content={`All website content, branding, text, and design elements are the intellectual property of ${SITE_IDENTITY.name} and may not be copied or distributed without permission.`}
            />

            <TermsBlock
              title="7. Limitation of Liability"
              content={`${SITE_IDENTITY.name} shall not be liable for any direct or indirect losses arising from the use of this website or reliance on the information provided.`}
            />

            <TermsBlock
              title="8. Privacy & Data Protection"
              content="Your use of our services is governed by our Privacy Policy, which outlines how we collect, store, and protect personal information."
            />

            <TermsBlock
              title="9. Updates to Terms"
              content="We reserve the right to update these Terms & Conditions at any time. Continued use of the website constitutes acceptance of the revised terms."
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] bg-[var(--surface-navy)] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Need Clarification?</p>
              <h2 className="mt-4 text-2xl font-black tracking-tight">Questions about website use or services</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Contact us if you want clarification on service scope, website use, counselling disclaimers, or related legal terms.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Contact Information</p>
              <div className="mt-5 space-y-4">
                <InfoRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={contactInfo.emails.general}
                  href={`mailto:${contactInfo.emails.general}`}
                />
                <InfoRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={contactInfo.phones.primary}
                  href={`tel:${contactInfo.phones.primaryRaw}`}
                />
                <InfoRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Address"
                  value={contactInfo.address.full}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

/* TERMS BLOCK */
function TermsBlock({
  title,
  content
}: {
  title: string
  content: React.ReactNode
}) {
  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
      <h2 className="mb-4 text-xl font-black text-[var(--surface-navy)] sm:text-2xl">
        {title}
      </h2>
      <div className="leading-8 text-slate-600">{content}</div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = href ? (
    <a href={href} className="break-all font-bold text-slate-900 transition-colors hover:text-amber-700">
      {value}
    </a>
  ) : (
    <p className="break-words font-bold leading-7 text-slate-900">{value}</p>
  )

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface-navy)] text-amber-300">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <div className="mt-1">{content}</div>
      </div>
    </div>
  )
}
