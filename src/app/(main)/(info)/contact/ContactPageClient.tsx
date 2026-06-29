"use client";
import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Globe, Users, CheckCircle, Instagram, Linkedin, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";

export default function ContactPage() {
  const { emails, phones, address, socials } = useContactInfo();
  const { openModal } = useFormModal();

  return (
    <div className="bg-[#FAFAFA] pb-20 pt-16 lg:pt-20">
      <section className="relative overflow-hidden border-b border-slate-100 bg-white py-16 lg:py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            Contact Summit Global
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 md:text-6xl">
            Start your <span className="text-amber-500">MBBS Abroad</span> or
            <span className="text-amber-500"> Study Abroad</span> conversation
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500 md:text-xl">
            Reach out for counselling on destinations, universities, admissions, eligibility,
            scholarships, visas, and next steps. We keep the process practical and clear.
          </p>
          
          <div className="mt-8">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-8 py-4 text-lg font-bold text-slate-950 transition-all duration-300 hover:bg-amber-400"
            >
              Free Consultation
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="mb-8 text-3xl font-black text-slate-900">Get in Touch</h2>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="group flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors duration-300 group-hover:bg-[var(--surface-navy)]">
                    <Phone className="h-6 w-6 text-[var(--surface-navy)] group-hover:text-white" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">Call Us</p>
                    <a href={createTelLink(phones.primary)} className="text-lg font-semibold text-slate-900 transition-colors hover:text-amber-600">
                      {phones.primary}
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Mon-Sat: 9AM-7PM</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors duration-300 group-hover:bg-[var(--surface-navy)]">
                    <Mail className="h-6 w-6 text-[var(--surface-navy)] group-hover:text-white" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">Email Us</p>
                    <a href={createMailtoLink(emails.info)} className="text-lg font-semibold text-slate-900 transition-colors hover:text-amber-600">
                      {emails.info}
                    </a>
                    <p className="text-sm text-slate-500 mt-1">24/7 Email Support</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 transition-colors duration-300 group-hover:bg-amber-500">
                    <MessageCircle className="h-6 w-6 text-amber-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">WhatsApp</p>
                    <a href={createWhatsAppLink(phones.primaryRaw)} className="text-lg font-semibold text-slate-900 transition-colors hover:text-amber-600">
                      Instant Chat
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Quick Responses</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors duration-300 group-hover:bg-[var(--surface-navy)]">
                    <MapPin className="h-6 w-6 text-[var(--surface-navy)] group-hover:text-white" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">Visit Office</p>
                    <p className="text-lg font-semibold text-slate-900 leading-snug">
                      {address.office}
                    </p>
                    <p className="text-sm text-slate-600">
                      {address.city}, {address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Clock className="h-6 w-6 text-amber-500" />
                <h3 className="text-2xl font-black text-slate-900">Office Hours</h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4 text-center">
                  <p className="text-sm font-medium text-slate-600 mb-1">Monday - Friday</p>
                  <p className="text-xl font-bold text-slate-900">9:00 - 19:00</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 text-center">
                  <p className="text-sm font-medium text-slate-600 mb-1">Saturday</p>
                  <p className="text-xl font-bold text-slate-900">10:00 - 16:00</p>
                </div>
                <div className="rounded-xl bg-amber-50 p-4 text-center">
                  <p className="mb-1 text-sm font-medium text-amber-700">Sunday</p>
                  <p className="text-xl font-bold text-amber-800">Closed</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-2xl font-black text-slate-900">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[var(--surface-navy)] p-4 text-white transition-transform hover:scale-105"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-slate-900 p-4 text-white transition-transform hover:scale-105"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={createWhatsAppLink(phones.primaryRaw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-amber-500 p-4 text-slate-950 transition-transform hover:scale-105"
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-[var(--surface-navy)] p-8 text-white shadow-sm">
              <h3 className="mb-6 text-xl font-black">Why Students Contact Us</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-8 w-8 text-amber-300" />
                  <div>
                    <div className="text-2xl font-extrabold">100%</div>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-300">Focused Guidance</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-amber-300" />
                  <div>
                    <div className="text-2xl font-extrabold">Clear</div>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-300">Process Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-amber-300" />
                  <div>
                    <div className="text-2xl font-extrabold">12K+</div>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-300">Students Guided</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="h-8 w-8 text-amber-300" />
                  <div>
                    <div className="text-2xl font-extrabold">30+</div>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-300">Destinations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-black text-slate-900">Need Help Right Away?</h3>
              <p className="mb-6 text-slate-600">Get quick help for counselling, country selection, exams, application planning, and visa questions.</p>
              <button
                onClick={openModal}
                className="w-full rounded-2xl bg-amber-500 px-6 py-4 font-bold text-slate-950 transition-all duration-300 hover:bg-amber-400"
              >
                Start Conversation
              </button>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-black text-slate-900">What We Help With</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-slate-700">MBBS Admissions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-slate-700">Study Abroad Counselling</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-slate-700">Visa Assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-slate-700">University Shortlisting</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
