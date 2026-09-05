import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhoItsFor from "@/components/WhoItsFor";
import ExperienceStatement from "@/components/ExperienceStatement";
import SevenDays from "@/components/SevenDays";
import Disciplines from "@/components/Disciplines";
import Benefits from "@/components/Benefits";
import ImageBreak from "@/components/ImageBreak";
import FinalStatement from "@/components/FinalStatement";
import Location from "@/components/Location";
import ApplicationCTA from "@/components/ApplicationCTA";
import ApplicationFormSection from "@/components/ApplicationFormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <WhoItsFor />
        <ExperienceStatement />
        <SevenDays />
        <Disciplines />
        <Benefits />
        <ImageBreak />
        <FinalStatement />
        <Location />
        <ApplicationCTA />
        <ApplicationFormSection />
      </main>
      <Footer />
    </>
  );
}
