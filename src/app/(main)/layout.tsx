import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import MbbsMarquee from "@/components/MbbsMarquee";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div>{children}</div>
      <Footer />
      <MbbsMarquee />
    </div>
  );
}
