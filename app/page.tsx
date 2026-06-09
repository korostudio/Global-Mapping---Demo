import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ISOBand from "@/components/ISOBand";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import Clients from "@/components/Clients";
import VideoSection from "@/components/VideoSection";
import Sectors from "@/components/Sectors";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ISOBand />
        <Services />
        <Stats />
        <WhyUs />
        <VideoSection />
        <Clients />
        <Sectors />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
