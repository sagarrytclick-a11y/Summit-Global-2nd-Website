import type { Metadata } from "next";
import EducationTimesAdvantage from "@/app/Components/AdvantageCard";
import CtaSection from "@/app/Components/CtaSection";
import EducationStats from "@/app/Components/EducationStats";
import FAQ from "@/app/Components/FAQ";
import FeaturedSection from "@/app/Components/FeaturedExams";
import Hero from "@/app/Components/Hero";
import LatestBlogs from "@/app/Components/LatestBlogs";
import PopularCountries from "@/app/Components/PopularCountries";
import ProcessJourney from "@/app/Components/ProcessJourney";
import Services from "@/app/Components/Services";
import StudentTestimonials from "@/app/Components/StudentTestimonials";
import StudyPrograms from "@/app/Components/StudyPrograms";
import MbbsAbroad from "../Components/MbbsAbroad";
import MbbsAbroadPopup from "../Components/MbbsAbroadPopup";
import { getHomepageData } from "@/lib/server/public-data";
import { SITE_IDENTITY } from "@/site-identity";

export const metadata: Metadata = {
  title: SITE_IDENTITY.meta.title,
  description: SITE_IDENTITY.meta.description,
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    url: "https://summitglobal.com",
  },
  twitter: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
  },
  alternates: {
    canonical: "https://summitglobal.com",
  },
};

const page = async () => {
  const homepageData = await getHomepageData();

  return (
    <div className="w-full overflow-x-hidden text-slate-950">
      <Hero />
      <MbbsAbroad initialColleges={homepageData.mbbsColleges} />
      <PopularCountries countries={homepageData.countries} />
      <EducationStats />
      <EducationTimesAdvantage />
      <FeaturedSection
        featuredColleges={homepageData.featuredColleges}
        exams={homepageData.featuredExams}
      />
      <StudyPrograms />
      <LatestBlogs initialBlogs={homepageData.latestBlogs} />
      <Services />
      <ProcessJourney />
      <StudentTestimonials />
      <FAQ />
      <CtaSection />
      <MbbsAbroadPopup />
    </div>
  );
};

export default page;
