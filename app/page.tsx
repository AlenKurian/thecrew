import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Marquee from "@/components/Marquee";
import WhoItsFor from "@/components/WhoItsFor";
import WytesStandard from "@/components/WytesStandard";
import ExperienceStatement from "@/components/ExperienceStatement";
import Disciplines from "@/components/Disciplines";
import FinalStatement from "@/components/FinalStatement";
import Location from "@/components/Location";
import ApplicationCTA from "@/components/ApplicationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Marquee />
        <WhoItsFor />
        <WytesStandard />
        <ExperienceStatement />
        <Disciplines />
        <FinalStatement />
        <Location />
        <ApplicationCTA />
      </main>
      <Footer />
    </>
  );
}
