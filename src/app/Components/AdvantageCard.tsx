"use client"
import React from 'react';
import { ArrowUpRight, CheckCircle2, Globe2, Headphones, ShieldCheck, UserRoundCheck, BadgeCheck } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconBg?: string;
}

const FeatureCard = ({ icon, title, description, className = "", iconBg = "bg-white" }: FeatureCardProps) => (
  <div className={`group relative rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 ${className}`}>
    <div className="flex flex-col h-full space-y-5">
      <div className={`w-fit rounded-2xl p-3.5 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold tracking-tight mb-2.5">{title}</h3>
        <p className="opacity-80 leading-relaxed text-sm lg:text-base font-medium">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default function EducationTimesAdvantage() {
  const trustCards = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
      title: "100% Genuine Admissions",
      description: "Direct partnerships with universities. No middlemen, no fraud.",
    },
    {
      icon: <UserRoundCheck className="h-6 w-6 text-amber-500" />,
      title: "Expert Counsellors",
      description: "Certified counsellors with years of abroad admissions experience.",
    },
    {
      icon: <Globe2 className="h-6 w-6 text-amber-500" />,
      title: "Global Network",
      description: "Partnerships spanning 500+ universities across 30+ countries.",
    },
    {
      icon: <ArrowUpRight className="h-6 w-6 text-amber-500" />,
      title: "Career-First Approach",
      description: "We match your profile with programs that align with your goals.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-amber-500" />,
      title: "Post-Landing Support",
      description: "Dedicated on-ground team in every country to support students.",
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-amber-500" />,
      title: "Certified & Accredited",
      description: "Recognized by trusted institutions and education bodies.",
    },
  ];

  return (
    <section id="about" className="section-home relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-20 lg:py-32">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-300/16 blur-[100px]" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-12">
          <div className="eyebrow mb-8">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Why Summit Global
          </div>

          <h2 className="mb-8 text-4xl font-black leading-[1.05] text-[var(--surface-navy)] md:text-6xl">
            The Most Trusted Name
            <br />
            in Abroad Admissions
          </h2>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            With years of experience and thousands of success stories, we deliver unmatched
            expertise, transparency, and results for every student.
          </p>

          <div className="mb-10 space-y-4">
            {[
              'NMC & WHO recognised university tie-ups only',
              'Dedicated counsellor assigned from day one',
              'Zero hidden charges and transparent fee guidance',
              '24/7 student support after landing abroad',
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 text-[15px] font-semibold text-[var(--surface-navy)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <CheckCircle2 size={16} />
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary group flex items-center gap-3 rounded-xl px-8 py-4 font-bold">
            Talk to a Counsellor
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {trustCards.map((item) => (
            <FeatureCard
              key={item.title}
              className="premium-card-light text-[var(--surface-navy)]"
              iconBg="bg-[var(--surface-navy)]/6"
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
