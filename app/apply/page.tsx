import type { Metadata } from "next";
import Header from "@/components/Header";
import ApplicationFormSection from "@/components/ApplicationFormSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Apply for The Crew",
  description:
    "Apply for STUDIO WYTES™ THE CREW — a 7-day immersive creative and production experience in Calicut, Kerala.",
};

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 xs:pt-24 sm:pt-28">
        <div className="border-b border-paper/15 bg-ink px-4 pb-8 pt-5 xs:px-6 xs:pb-10 xs:pt-6 sm:px-10">
          <span className="font-meta text-[10px] text-crew-orange xs:text-[11px]">
            Studio Wytes™ — The Crew
          </span>
          <h1 className="mt-2 font-display text-[8vw] uppercase leading-[0.95] text-paper xs:mt-3 xs:text-[9vw] sm:text-[4vw]">
            7 Days. One Experience.
          </h1>
          <p className="font-meta mt-2 text-[10px] text-paper/50 xs:text-[11px]">
            Calicut • Kerala
          </p>
        </div>
        <ApplicationFormSection />
      </main>
      <Footer />
    </>
  );
}
