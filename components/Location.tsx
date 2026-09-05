"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

export default function Location() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".location-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-paper/15 bg-ink px-4 py-16 text-center xs:px-6 xs:py-24 sm:py-32"
    >
      {/* Subtle geographic mark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
        aria-hidden="true"
      >
        <span className="font-display text-[45vw] leading-none sm:text-[24vw]">
          ✦
        </span>
      </div>

      <span className="location-reveal relative block text-[10px] font-meta text-paper/60 xs:text-[11px] sm:text-xs">
        Calicut, Kerala
      </span>

      <h2 className="location-reveal relative mt-3 font-display text-[9vw] uppercase leading-[0.95] text-paper xs:mt-4 xs:text-[10vw] sm:mt-6 sm:text-[6vw]">
        Limited Crew<br className="sm:hidden" /> Positions.
      </h2>
    </section>
  );
}
