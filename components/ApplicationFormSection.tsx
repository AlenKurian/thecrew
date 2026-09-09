"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import ApplicationForm from "./ApplicationForm";

export default function ApplicationFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".apply-heading",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apply"
      ref={sectionRef}
      className="scroll-mt-24 bg-paper px-4 pt-8 pb-16 xs:px-6 xs:pt-12 xs:pb-24 sm:px-10 sm:pt-16 sm:pb-32"
    >
      <div className="mx-auto w-full max-w-[110rem] rounded-[1.5rem] border border-ink/10 bg-ink p-4 xs:rounded-[2.5rem] xs:p-10 sm:p-14">
        <div className="apply-heading">
          <span className="text-[9px] font-meta text-paper xs:text-[11px]">
            The Application
          </span>
          <h2 className="mt-2 font-display text-[8.5vw] uppercase leading-[0.95] text-paper xs:mt-4 xs:text-[12vw] sm:text-[4vw]">
            Get in the Room.
          </h2>
          <p className="mt-2 text-[12px] leading-relaxed text-paper/70 xs:mt-4 xs:text-base sm:text-lg">
            This is a limited-position program built for people who are
            curious, driven, and ready to contribute. Tell us who you are,
            what you do, and why you want to get in the room.
          </p>
        </div>

        <ApplicationForm />
      </div>
    </section>
  );
}
