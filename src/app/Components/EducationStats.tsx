"use client"
import React from 'react';

export default function EducationStats() {
  const stats = [
    {
      value: "12,000+",
      label: "Students Successfully Placed",
    },
    {
      value: "30+",
      label: "Countries We Operate In",
    },
    {
      value: "500+",
      label: "Partner Universities Globally",
    },
    {
      value: "16+",
      label: "Years of Excellence",
    }
  ];

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="stat-strip mx-auto max-w-7xl rounded-[1.5rem] px-6 py-8 shadow-xl shadow-[var(--surface-navy)]/10 sm:px-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="lg:border-r lg:border-white/10 lg:pr-6 last:border-r-0">
              <div className="mb-2 text-4xl font-black text-white md:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
