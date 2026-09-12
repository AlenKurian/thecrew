"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-paper px-4 pt-16 pb-8 text-center text-ink xs:px-6 xs:pt-28 xs:pb-12 sm:pt-40 sm:pb-16"
    >
      <span className="cta-reveal font-meta -mt-6 mb-8 block text-[10px] text-ink/60 xs:-mt-8 xs:mb-12 xs:text-[11px]">
        Your Place in the Room
      </span>
      <h2 className="cta-reveal font-display text-[6.4vw] uppercase leading-[0.95] xs:text-[9vw] sm:text-[5.4vw]">
        Ready to Get
        <span className="mt-2 block text-ink/45 xs:mt-3 sm:mt-1">In the Room?</span>
      </h2>

      <p className="cta-reveal mt-4 max-w-2xl text-sm font-medium xs:mt-6 xs:text-base sm:mt-8 sm:text-xl">
        Tell us who you are, what you want to build, what you bring, and why
        you want to be part of THE CREW&trade;.
      </p>

      <p className="cta-reveal mt-3 max-w-xl text-xs text-ink/60 xs:mt-4 xs:text-sm">
        Limited positions available. Participation details &amp; next steps
        communicated via email.
      </p>

      <Link
        href="/apply"
        className="cta-reveal group relative mt-8 inline-flex items-center gap-2 overflow-hidden bg-ink px-6 py-4 text-[11px] font-bold uppercase leading-none tracking-[0.15em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink hover:ring-1 hover:ring-inset hover:ring-ink xs:mt-10 xs:px-8 xs:py-5 xs:text-xs sm:mt-12 sm:px-10 sm:py-6 sm:text-sm"
      >
        Apply Now
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </section>
  );
}
