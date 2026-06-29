"use client"
import React from 'react';
import { ArrowRight, GraduationCap, ShieldCheck, Users, Stethoscope } from 'lucide-react';

export default function StudyPrograms() {
  const programs = [
    {
      icon: GraduationCap,
      title: "MBBS Abroad",
      description: "Complete medical education in NMC approved universities with zero donation",
      features: ["NMC Approved", "Zero Donation", "Global Recognition", "Hostel Facility"],
      color: "default"
    },
    {
      icon: ShieldCheck,
      title: "Pre-Medical Foundation", 
      description: "Foundation programs to prepare for MBBS admissions abroad",
      features: ["Biology Focus", "Chemistry Prep", "Physics Basics", "English Support"],
      color: "default"
    },
    {
      icon: Users,
      title: "Medical Counseling",
      description: "Expert guidance for choosing the right medical university",
      features: ["Career Guidance", "University Selection", "Visa Support", "Admission Help"],
      color: "default"
    },
    {
      icon: Stethoscope,
      title: "Post-MBBS Support",
      description: "Complete support after MBBS for licensing and career",
      features: ["FMGE Prep", "Internship Help", "Career Guidance", "Job Placement"],
      color: "accent"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      default: {
        bg: "bg-white",
        iconBg: "bg-[var(--surface-navy)]",
        text: "text-amber-500",
        border: "border-slate-100",
        title: "text-slate-950",
        body: "text-slate-600",
        bullet: "bg-amber-500"
      },
      accent: {
        bg: "bg-slate-50",
        iconBg: "bg-amber-500",
        text: "text-amber-600", 
        border: "border-slate-100",
        title: "text-slate-950",
        body: "text-slate-600",
        bullet: "bg-amber-500"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.default;
  };

  return (
    <section className="section-home py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="eyebrow">
            MBBS Programs Abroad
          </div>
          <h2 className="mt-6 text-3xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
            Programs built on a
            <span className="heading-gold block">clean, consistent system</span>
          </h2>
          <p className="mx-auto max-w-3xl px-4 text-base font-medium text-slate-600 sm:text-lg">
            Complete MBBS education programs designed for students seeking quality medical education abroad with NMC approved universities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {programs.map((program, index) => {
            const colors = getColorClasses(program.color);
            return (
              <div key={index} className={`group relative rounded-[1.75rem] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-6 ${colors.bg} ${colors.border}`}>
                <div className={`absolute -mr-10 -mt-10 h-20 w-20 rounded-bl-full ${colors.iconBg} opacity-10 top-0 right-0`} />
                
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${colors.iconBg} text-white sm:h-14 sm:w-14 group-hover:scale-105 transition-transform`}>
                  <program.icon size={28} className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className={`mb-3 text-lg font-black sm:text-xl ${colors.title}`}>
                  {program.title}
                </h3>
                
                <p className={`mb-4 text-xs leading-relaxed sm:text-sm ${colors.body}`}>
                  {program.description}
                </p>
                
                <div className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${colors.bullet}`} />
                      <span className={`text-xs font-medium ${colors.body}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold sm:gap-3 sm:px-8 sm:py-4">
            <span className="text-sm sm:text-base">Explore MBBS Programs</span>
            <ArrowRight size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
