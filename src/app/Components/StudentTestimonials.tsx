"use client"
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { TestimonialSkeleton } from "./TestimonialSkeleton";

type Testimonial = {
  name: string;
  course: string;
  quote: string;
  image: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Aravind Iyer",
    course: "MS IN COMPUTER SCIENCE, STANFORD",
    quote: "Summit Global turned my Ivy League dream into reality. From shortlisting universities to my SOP review, their attention to detail was incredible. I even secured a $20k scholarship!",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Mumbai, India"
  },
  {
    name: "Sneha Kapoor",
    course: "MBA, INSEAD FRANCE",
    quote: "The visa process for Europe seemed daunting, but the team handled everything. Their mock interviews gave me the confidence I needed. Best decision for my international career.",
    image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Delhi, India"
  },
  {
    name: "Rohan Deshmukh",
    course: "MENG, UNIVERSITY OF TORONTO",
    quote: "I was worried about my education loan and financial docs. Summit Global's tie-ups with banks made the process seamless. I'm now studying in Canada without any financial stress.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Pune, India"
  },
  {
    name: "Ananya Reddy",
    course: "MASTERS IN DATA ANALYTICS, NUS",
    quote: "The personalized guidance is what sets them apart. They didn't just give me a list; they helped me choose the right fit for my career goals in Singapore.",
    image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Hyderabad, India"
  }
];

export default function StudentTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="section-home relative overflow-hidden py-16 sm:py-24">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-amber-300/20 blur-[120px] opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="eyebrow">
            Most Trusted Consultants
          </div>

          <h2 className="mb-6 mt-6 text-4xl font-black tracking-tight text-[var(--surface-navy)] md:text-6xl">
            Success Stories from <br />
            <span className="heading-gold">Our Global Students</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6 font-medium italic text-slate-500">
            <span>"99% Visa Success Rate"</span>
            <span className="hidden sm:block">•</span>
            <span>"₹2Cr+ Scholarships Secured"</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3 sm:px-4">
                  <div className="premium-card-light flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <Quote className="mb-4 text-amber-200" size={40} fill="currentColor" />
                      <div className="flex gap-1 text-amber-400 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-amber-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-base">{item.name}</p>
                        <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-amber-500">{item.course}</p>
                        <p className="text-xs text-slate-400">{item.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Navigation - Positioned for better UX */}
          <div className="flex justify-center mt-12 gap-4">
            <button 
              onClick={scrollPrev}
              className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-600 shadow-md transition-all hover:border-amber-400 hover:text-amber-500 active:scale-95"
            >
              <ArrowLeft size={24} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <button 
              onClick={scrollNext}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-navy)] text-amber-300 shadow-lg transition-all hover:bg-[var(--surface-navy-2)] active:scale-95"
            >
              <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
