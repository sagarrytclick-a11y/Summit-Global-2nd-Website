'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  Phone,
  School,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { useCollege } from '@/hooks/useColleges'
import { useFormModal } from '@/context/FormModalContext'
import { useContactInfo } from '@/hooks/useContactInfo'
import FAQ from '@/app/Components/FAQ'
import { CollegeDetailSkeleton } from '@/app/Components/PublicPageSkeletons'
import RelatedColleges from './RelatedColleges'

interface CollegeDetailPageProps {
  slug: string
}

const SectionTitle = ({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) => (
  <div className="mb-8">
    <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{title}</h2>
    {description ? <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500">{description}</p> : null}
  </div>
)

const CollegeDetailRedesign: React.FC<CollegeDetailPageProps> = ({ slug }) => {
  const { openModal } = useFormModal()
  const { phones, emails } = useContactInfo()
  const { data: college, isLoading, error, refetch } = useCollege(slug)

  const quickFacts = useMemo(() => {
    if (!college) return []

    return [
      {
        label: 'Country',
        value: college.country_ref?.name || 'International',
        icon: MapPin,
      },
      {
        label: 'Established',
        value: college.establishment_year || 'Updated',
        icon: Calendar,
      },
      {
        label: 'Duration',
        value: college.duration || college.fees_structure?.courses?.[0]?.duration || '5-6 Years',
        icon: Clock,
      },
      {
        label: 'Tuition',
        value: college.fees_structure?.courses?.[0]?.annual_tuition_fee || (college.fees ? `$${college.fees.toLocaleString()}` : 'Contact us'),
        icon: DollarSign,
      },
    ]
  }, [college])

  const highlightItems = college?.key_highlights?.features || []
  const whyChooseItems = college?.why_choose_us?.features || []
  const documentItems = college?.documents_required?.documents || []
  const campusItems = college?.campus_highlights?.highlights || []
  const feeCourses = college?.fees_structure?.courses || []
  const admissionSteps = college?.admission_process?.steps || []
  const relatedExams = college?.exams || []

  const sectionLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'fees', label: 'Fees' },
    { id: 'admission', label: 'Admission' },
    { id: 'documents', label: 'Documents' },
    { id: 'campus', label: 'Campus' },
  ]

  if (isLoading) {
    return <CollegeDetailSkeleton />
  }

  if (error || !college) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-6">
        <div className="max-w-md rounded-[2rem] border border-slate-100 bg-slate-50 p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
            <School className="h-8 w-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">College Unavailable</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            {error instanceof Error ? error.message : 'The college profile could not be loaded right now.'}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => refetch()}
              className="rounded-2xl bg-[var(--surface-navy)] px-6 py-3 font-bold text-white transition-colors hover:bg-slate-800"
            >
              Try Again
            </button>
            <Link
              href="/colleges"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-[var(--surface-navy)] transition-colors hover:bg-slate-50"
            >
              Browse Colleges
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/colleges" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-amber-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:pb-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                <Sparkles className="h-3.5 w-3.5" />
                {college.country_ref?.name || 'Global'} Destination
              </span>
              {college.ranking ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                  <Trophy className="h-3.5 w-3.5 text-amber-500" />
                  Rank {typeof college.ranking === 'object' ? college.ranking.country_ranking || college.ranking.world_ranking : college.ranking}
                </span>
              ) : null}
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {college.name}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
              {college.overview?.description || college.about_content || 'Explore admission details, fees, documents, and student support information for this institution.'}
            </p>

            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-5">
                  <div className="flex items-center gap-2 text-amber-500">
                    <fact.icon className="h-4 w-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{fact.label}</span>
                  </div>
                  <p className="mt-3 text-base font-black text-slate-950">{fact.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 text-base font-black text-slate-950 transition-all hover:bg-amber-400"
              >
                Book Counselling
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-black text-[var(--surface-navy)] transition-all hover:bg-slate-50"
              >
                Request Prospectus
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 shadow-sm">
              <img
                src={college.banner_url || `https://picsum.photos/seed/${college.slug}/900/700`}
                alt={college.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 rounded-[1.5rem] border border-white/70 bg-white/95 px-5 py-4 shadow-sm backdrop-blur-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Best For</p>
              <p className="mt-1 text-lg font-black text-slate-950">MBBS Abroad & Study Abroad Planning</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:border-amber-300 hover:text-amber-700"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <div className="space-y-8">
          <section id="overview" className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
            <SectionTitle
              eyebrow="College Overview"
              title={college.overview?.title || 'A closer look at the institution'}
              description={college.overview?.description || college.about_content}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-navy)] text-amber-300">
                      <fact.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">{fact.label}</p>
                      <p className="mt-1 font-bold text-slate-900">{fact.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {highlightItems.length > 0 ? (
            <section id="highlights" className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Key Highlights"
                title={college.key_highlights?.title || 'Why students shortlist this college'}
                description={college.key_highlights?.description}
              />
              <div className="grid gap-4 md:grid-cols-2">
                {highlightItems.map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                      <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {whyChooseItems.length > 0 ? (
            <section className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Why Choose This College"
                title={college.why_choose_us?.title || 'Student-value factors'}
                description={college.why_choose_us?.description}
              />
              <div className="grid gap-4 md:grid-cols-2">
                {whyChooseItems.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {feeCourses.length > 0 ? (
            <section id="fees" className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Fee Structure"
                title={college.fees_structure?.title || 'Course and tuition details'}
                description={college.fees_structure?.description}
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                      <th className="px-4 py-2">Course</th>
                      <th className="px-4 py-2">Duration</th>
                      <th className="px-4 py-2">Annual Tuition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeCourses.map((course, index) => (
                      <tr key={`${course.course_name}-${index}`} className="bg-slate-50">
                        <td className="rounded-l-2xl px-4 py-4 font-bold text-slate-900">{course.course_name}</td>
                        <td className="px-4 py-4 font-medium text-slate-600">{course.duration}</td>
                        <td className="rounded-r-2xl px-4 py-4 font-black text-amber-600">{course.annual_tuition_fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {admissionSteps.length > 0 ? (
            <section id="admission" className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Admission Journey"
                title={college.admission_process?.title || 'How the admission process works'}
                description={college.admission_process?.description}
              />
              <div className="grid gap-4">
                {admissionSteps.map((step, index) => (
                  <div key={`${step}-${index}`} className="flex gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface-navy)] text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold leading-7 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {documentItems.length > 0 ? (
            <section id="documents" className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Required Documents"
                title={college.documents_required?.title || 'Documents to keep ready'}
                description={college.documents_required?.description}
              />
              <div className="grid gap-4 md:grid-cols-2">
                {documentItems.map((doc, index) => (
                  <div key={`${doc}-${index}`} className="flex gap-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-sm font-black text-amber-700">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold leading-7 text-slate-700">{doc}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {campusItems.length > 0 ? (
            <section id="campus" className="scroll-mt-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Campus Highlights"
                title={college.campus_highlights?.title || 'What student life can look like'}
                description={college.campus_highlights?.description}
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {campusItems.map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                    <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {college.ranking && typeof college.ranking === 'object' ? (
            <section className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Ranking & Recognition"
                title={college.ranking.title || 'Institution standing'}
                description={college.ranking.description}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Country Rank</p>
                  <p className="mt-3 text-4xl font-black text-slate-950">#{college.ranking.country_ranking || 'N/A'}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">World Rank</p>
                  <p className="mt-3 text-4xl font-black text-slate-950">#{college.ranking.world_ranking || 'N/A'}</p>
                </div>
              </div>
              {college.ranking.accreditation?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {college.ranking.accreditation.map((item, index) => (
                    <span key={`${item}-${index}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="rounded-[2.5rem] bg-[var(--surface-navy)] p-10 text-white">
            <h3 className="text-3xl font-black tracking-tight">Need help choosing the right college?</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Get practical support for country selection, tuition planning, application steps,
              eligibility, and student documentation.
            </p>
            <button
              onClick={openModal}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 text-base font-black text-slate-950 transition-all hover:bg-amber-400"
            >
              Talk to an Expert
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Quick Actions</p>
            <div className="mt-5 space-y-3">
              <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 font-black text-slate-950 transition-colors hover:bg-amber-400"
              >
                Apply With Guidance
              </button>
              <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black text-[var(--surface-navy)] transition-colors hover:bg-slate-50"
              >
                Request Call Back
              </button>
            </div>
          </div>

          {relatedExams.length > 0 ? (
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Accepted Exams</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {relatedExams.map((exam, index) => (
                  <span key={`${exam}-${index}`} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Need Direct Help?</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-navy)] text-amber-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Phone</p>
                  <p className="break-words font-bold text-slate-900">{phones.primary}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface-navy)] text-amber-300">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Email</p>
                  <p className="break-all font-bold leading-7 text-slate-900">{emails.info}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="More Options"
          title="Related colleges you can also explore"
          description="Compare similar options before making your final decision."
        />
        <RelatedColleges currentCollegeSlug={college.slug} />
      </section>

      <FAQ />
    </div>
  )
}

export default CollegeDetailRedesign
