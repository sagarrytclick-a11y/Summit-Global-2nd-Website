"use client"
import Image from "next/image";
import {
  Settings,
  ShieldCheck,
  Wallet,
  Globe,
  ArrowUpRight,
  BookOpen,
  Users,
  Compass
} from "lucide-react";
import Link from "next/link";

export default function ComprehensiveServices() {
  const services = [
    {
      id: "01",
      title: "Profile Mapping",
      description:
        "We evaluate your academic background, budget, and career goals to create a shortlist that is practical and high-conversion.",
      icon: Settings,
      accent: "University Match",
    },
    {
      id: "02",
      title: "Visa & Documentation",
      description:
        "Every visa, SOP, document set, and deadline is handled with a process-first approach so you avoid last-minute confusion.",
      icon: ShieldCheck,
      accent: "99% Visa Success",
    },
    {
      id: "03",
      title: "Scholarship & Budgeting",
      description:
        "From tuition planning to scholarship opportunities, we help students find a financially sustainable path abroad.",
      icon: Wallet,
      accent: "45Cr+ Aid Guided",
    },
    {
      id: "04",
      title: "Test Prep & Readiness",
      description:
        "Preparation support for IELTS, GRE, GMAT, and interview stages with a strong focus on admission-readiness.",
      icon: BookOpen,
      accent: "Exam Support",
    },
    {
      id: "05",
      title: "Global Student Network",
      description:
        "Students get access to pre-departure guidance, alumni support, and practical on-ground insights after admission.",
      icon: Users,
      accent: "15+ Countries",
    },
  ];

  return (
    <section id="services" className="section-home relative overflow-hidden py-20 lg:py-32">
      <div className="absolute right-0 top-0 h-1/3 w-1/3 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-300/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="eyebrow">
              <Compass className="w-3 h-3" />
              Our Ecosystem
            </div>

            <h2 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-slate-950 md:text-6xl">
              Services designed for a
              <br />
              <span className="heading-gold">smoother abroad journey.</span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-slate-600 md:text-xl">
              Instead of a generic consultancy model, we provide a structured admission support
              system covering university selection, documentation, scholarships, test prep, and
              post-admission guidance.
            </p>
          </div>

          <Link
            href="/service"
            className="btn-primary group inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-bold"
          >
            Explore All Services
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="premium-card relative overflow-hidden rounded-[2rem] p-8 md:p-10">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-amber-300/10 blur-[80px]" />

            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-700">
                <Globe className="h-4 w-4" />
                End-To-End Support
              </div>

              <h3 className="max-w-lg text-3xl font-black leading-tight text-[var(--surface-navy)] md:text-4xl">
                One dedicated system for applications, funding, visas, and student support.
              </h3>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Our process is built to reduce friction at every stage, so students and parents
                always know what happens next and what is required.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Personalized university shortlist",
                  "Transparent fee and funding guidance",
                  "Deadline and documentation tracking",
                  "Support before and after admission",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 overflow-hidden rounded-[1.5rem]">
                <div className="relative h-64 w-full">
                  <Image
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Student counselling support"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-navy)]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                      Structured Guidance
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--surface-navy)]">
                      Built for clarity, speed, and stronger outcomes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="premium-card-light group grid gap-5 rounded-[1.75rem] border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 md:grid-cols-[auto_1fr_auto] md:items-start"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-navy)] text-amber-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-3xl font-black leading-none text-slate-200 md:hidden">
                      {service.id}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-amber-600">
                        {service.accent}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-950">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {service.description}
                    </p>
                  </div>

                  <div className="hidden h-full items-start justify-end md:flex">
                    <div className="rounded-full bg-slate-50 px-4 py-2 text-sm font-black text-slate-300">
                      {service.id}
                    </div>
                  </div>
                </div>
              );
            })}

       
          </div>
        </div>
      </div>
    </section>
  );
}
