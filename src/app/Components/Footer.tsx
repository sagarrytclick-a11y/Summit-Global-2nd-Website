"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { SITE_CONTACT, SITE_IDENTITY } from "@/config/site-config";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from '@/context/FormModalContext';

const Footer = () => {
  const { emails, phones, address } = useContactInfo();
  const { openModal } = useFormModal();
  const socialLinks = [
    { label: 'Instagram', href: SITE_CONTACT.socials.instagram, icon: <Instagram className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: 'LinkedIn', href: SITE_CONTACT.socials.linkedin, icon: <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: 'X', href: SITE_CONTACT.socials.twitter, icon: <span className="text-sm font-black sm:text-base">X</span> },
    { label: 'YouTube', href: SITE_CONTACT.socials.youtube, icon: <Youtube className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: 'Facebook', href: SITE_CONTACT.socials.facebook, icon: <Facebook className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="brand-panel relative overflow-hidden px-6 pb-10 pt-20">
      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-amber-300/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              Summit Global
            </div>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Start your MBBS and study abroad journey with a team you can trust.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-200">
              Admissions, scholarships, visa support, and university shortlisting built around a clear,
              transparent process for students and parents.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:flex-col">
            <button
              onClick={openModal}
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold"
            >
              <Phone size={18} />
              Free Counselling
            </button>
            <Link
              href="/colleges"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-4 font-bold text-white transition-all duration-200 hover:bg-white/15"
            >
              Explore Universities
            </Link>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 sm:gap-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative rounded-2xl bg-white p-2 shadow-lg shadow-black/10">
                <Image
                  src={SITE_IDENTITY.assets.logo.main}
                  alt={SITE_IDENTITY.name}
                  width={150}
                  height={48}
                  className="h-10 w-auto rounded-lg object-contain"
                />
              </div>
              <div className="flex flex-col text-white">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Summit Global
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  Trusted partner for India & abroad
                </span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-7 text-slate-200 sm:text-[15px]">
              {SITE_IDENTITY.description}
            </p>
            <div className="flex flex-wrap gap-3 text-slate-200 sm:gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 transition-all duration-200 hover:scale-105 hover:text-amber-300"
                >
                  {item.icon}
                </a>
              ))}
           
            
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-slate-300">Services</h4>
            <ul className="flex flex-col gap-4 text-[15px] text-slate-200">
              <li><Link href="/colleges" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Study Abroad Programs</Link></li>
              <li><Link href="/mbbs-abroad" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">MBBS Abroad</Link></li>
              <li><Link href="/exams" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Entrance Exam Prep</Link></li>
              <li><Link href="/blogs" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Career Guidance</Link></li>
              <li><Link href="/contact" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">Admission Counseling</Link></li>
              <li><Link href="/study-abroad" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-amber-300">University Selection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-slate-300">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[15px] text-slate-200">
                <Phone size={16} className="text-amber-300" />
                <a href={createTelLink(phones.primary)} className="transition-colors hover:text-amber-300">
                  {phones.primary}
                </a>
              </div>
              {phones.additional.length > 0 && (
                <div className="flex items-center gap-3 text-[15px] text-slate-200">
                  <Phone size={16} className="text-amber-300" />
                  <a href={createTelLink(phones.additional[0])} className="transition-colors hover:text-amber-300">
                    {phones.additional[0]}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3 text-[15px] text-slate-200">
                <Mail size={16} className="text-amber-300" />
                <a href={createMailtoLink(emails.info)} className="transition-colors hover:text-amber-300">
                  {emails.info}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[15px] text-slate-200">
                <MessageCircle size={16} className="text-amber-300" />
                <a href={createWhatsAppLink(phones.primaryRaw)} className="transition-colors hover:text-amber-300">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-start gap-3 text-[15px] text-slate-200">
                <MapPin size={50} className="mt-1 text-amber-300" />
                <span className="leading-relaxed">{address.full}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-slate-300">Trust Signals</h4>
            <div className="space-y-3">
              {["Trusted MBBS guidance", "Transparent fee process", "Partner university network", "Student-first support"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          
           
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 sm:pt-12 lg:pt-16">
          <div className="flex flex-col gap-8 sm:gap-12 mb-6 sm:mb-8">
            <div className="text-center lg:text-center">
              <p className="mb-2 text-xs font-medium text-slate-200 sm:text-sm">© {SITE_IDENTITY.business.established} {SITE_IDENTITY.name}. All rights reserved.</p>
              <p className="text-xs text-slate-300">{SITE_IDENTITY.tagline}</p>
            </div>
            <div className="mt-8 text-center max-w-4xl mx-auto">
              <p className="text-xs leading-relaxed text-slate-300">
                Disclaimer: Summit Global provides guidance and counseling services
                based on experience and available information. We do not guarantee admission,
                visa approval, or outcomes, as final decisions are made by respective
                institutions and authorities.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs sm:gap-6 sm:text-sm lg:gap-8">
              <Link href="/privacy" className="text-slate-300 transition-all duration-200 hover:scale-105 hover:text-amber-300">Privacy Policy</Link>
              <Link href="/term" className="text-slate-300 transition-all duration-200 hover:scale-105 hover:text-amber-300">Terms of Service</Link>
              <Link href="#" className="text-slate-300 transition-all duration-200 hover:scale-105 hover:text-amber-300">Cookie Policy</Link>
              <Link href="/contact" className="text-slate-300 transition-all duration-200 hover:scale-105 hover:text-amber-300">Contact Us</Link>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 text-xs text-slate-200 sm:flex-row sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-amber-300 sm:text-lg">●</span>
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-amber-300 sm:text-lg">●</span>
                <span className="font-medium">100% Secure</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 sm:gap-6 sm:text-sm lg:gap-8">
              <div className="flex items-center gap-2">
                <span className="text-amber-300">🔒</span>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-300">📧</span>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-300">🏆</span>
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-300">⭐</span>
                <span>4.9/5 Trustpilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
