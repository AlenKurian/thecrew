"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

export default function ApplicationCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-paper px-4 py-16 text-center text-ink xs:px-6 xs:py-28 sm:py-40"
    >
      <h2 className="cta-reveal font-display text-[9.5vw] uppercase leading-[0.95] xs:text-[11vw] sm:text-[6.5vw]">
        Ready to Get
        <br />
        In the Room?
      </h2>

      <p className="cta-reveal mt-4 max-w-lg text-sm font-medium xs:mt-6 xs:text-base sm:mt-8 sm:text-xl">
        If you&rsquo;re curious, hands-on, and ready to be part of the
        experience, apply for THE CREW.
      </p>

      <a
        href="#apply"
        onClick={scrollToForm}
        className="cta-reveal group relative mt-8 inline-block overflow-hidden bg-ink px-6 py-4 text-[11px] font-bold uppercase leading-none tracking-[0.15em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink xs:mt-10 xs:px-8 xs:py-5 xs:text-xs sm:mt-12 sm:px-10 sm:py-6 sm:text-sm"
      >
        {/* Invisible sizer keeps the button's width/height fixed to the
            longer of the two labels, so the absolutely-positioned slides
            below have a box to sit inside. */}
        <span className="invisible flex items-center gap-2" aria-hidden="true">
          Apply for the Crew
          <span>→</span>
        </span>
        <span className="absolute inset-0 flex items-center justify-center gap-2 px-6 transition-transform duration-300 ease-out group-hover:-translate-y-full xs:px-8 sm:px-10">
          Apply for the Crew
          <span aria-hidden="true">→</span>
        </span>
        <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-2 px-6 transition-transform duration-300 ease-out group-hover:translate-y-0 xs:px-8 sm:px-10">
          Get in the Room
          <span aria-hidden="true">→</span>
        </span>
      </a>
    </section>
  );
}
