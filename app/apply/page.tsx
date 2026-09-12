import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ApplicationFormSection from "@/components/ApplicationFormSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Apply for The Crew",
  description:
    "Apply for STUDIO WYTES™ THE CREW — an immersive event, production, and experience-building program. Limited positions available.",
};

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 xs:pt-24 sm:pt-28">
        <div className="border-b border-paper/15 bg-ink px-4 pb-8 pt-5 xs:px-6 xs:pb-10 xs:pt-6 sm:px-10">
          <Link
            href="/"
            className="group mb-4 flex w-fit items-center gap-1.5 font-meta text-[10px] text-paper/60 transition-colors duration-300 hover:text-paper xs:mb-5 xs:text-[11px]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back
          </Link>
          <span className="font-meta text-[10px] text-paper xs:text-[11px]">
            Studio Wytes™ — The Crew™
          </span>
          <h1 className="mt-2 font-display text-[6.7vw] uppercase leading-[0.95] text-paper xs:mt-3 xs:text-[7.5vw] sm:text-[3.3vw]">
            Your Place <span className="text-muted">in the Room.</span>
          </h1>
          <p className="font-meta mt-2 text-[10px] text-paper/50 xs:text-[11px]">
            Limited positions available
          </p>
        </div>
        <ApplicationFormSection />
      </main>
      <Footer />
    </>
  );
}
