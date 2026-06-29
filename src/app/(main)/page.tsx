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
