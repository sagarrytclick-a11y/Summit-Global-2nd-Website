'use client'

import { useContactInfo } from '@/hooks/useContactInfo'
import { SITE_IDENTITY } from '@/site-identity'
import { Mail, MapPin, ShieldCheck, Phone, FileLock2 } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const contactInfo = useContactInfo()

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                <FileLock2 className="h-3.5 w-3.5" />
                Legal & Privacy
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Privacy Policy
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
                Understand how {SITE_IDENTITY.name} collects, uses, and protects your information while you explore MBBS Abroad and Study Abroad guidance on our website.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-950">Privacy</p>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Updated for website enquiries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'Personal data is handled for counselling and enquiry support',
              'We do not sell or rent student information',
              'Contact us any time for privacy-related questions',
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
            <PolicyBlock
              title="1. Introduction"
              content={`${SITE_IDENTITY.name} respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website or services.`}
            />

            <PolicyBlock
              title="2. Information We Collect"
              content={
                <ul className="list-disc pl-6 space-y-3">
                  <li>Personal information such as name, email address, and phone number</li>
                  <li>Academic background and education preferences</li>
                  <li>Country, course, and institution interests</li>
                  <li>Information shared via enquiry or counselling forms</li>
                  <li>Technical data such as IP address and browser details</li>
                </ul>
              }
            />

            <PolicyBlock
              title="3. How We Use Your Information"
              content={
                <ul className="list-disc pl-6 space-y-3">
                  <li>To provide personalised education counselling</li>
                  <li>To respond to your enquiries and requests</li>
                  <li>To improve our services and website experience</li>
                  <li>To share relevant education updates and opportunities</li>
                  <li>To meet legal and regulatory obligations</li>
                </ul>
              }
            />

            <PolicyBlock
              title="4. Data Security"
              content="We follow strict technical and organisational measures to protect your personal information from unauthorised access, misuse, or disclosure. Access is limited to authorised personnel only."
            />

            <PolicyBlock
              title="5. Sharing of Information"
              content={`${SITE_IDENTITY.name} does not sell or rent your personal data. Information may be shared only with trusted academic partners or service providers when required to deliver our services or comply with legal requirements.`}
            />

            <PolicyBlock
              title="6. Cookies & Tracking"
              content="Our website may use cookies to enhance functionality and analyse website traffic. You can manage or disable cookies through your browser settings."
            />

            <PolicyBlock
              title="7. Your Rights"
              content="You have the right to access, update, or request deletion of your personal information. You may also withdraw consent for data usage by contacting us."
            />

            <PolicyBlock
              title="8. Policy Updates"
              content="This Privacy Policy may be updated periodically to reflect changes in regulations or our practices. Any updates will be posted on this page."
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] bg-[var(--surface-navy)] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-300">Need Help?</p>
              <h2 className="mt-4 text-2xl font-black tracking-tight">Privacy-related questions</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Reach out if you want clarification on enquiries, student data, or how information is used on this website.
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

/* POLICY BLOCK */
function PolicyBlock({
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
