"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

export default function Introduction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".intro-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper px-4 py-16 text-ink xs:px-6 xs:py-24 sm:px-10 sm:py-32"
    >
      <div className="intro-reveal mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="font-display text-[7vw] uppercase leading-[0.95] xs:text-[7.5vw] sm:text-[2.6vw]">
          Some people attend experiences.{" "}
          <span className="text-ink/45"> <br />Others build them.</span>
        </p>
        <p className="intro-reveal mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-ink/80 xs:mt-8 xs:text-base sm:text-lg">
          THE CREW&trade; is an immersive event and production experience for
          ambitious people who want to move beyond observation and become
          part of how real experiences are built. From concept and planning
          to production, coordination, execution, and live experience, THE
          CREW&trade; brings people closer to the work behind memorable
          events.
        </p>

        <div className="intro-reveal mt-8 flex flex-wrap items-center justify-center gap-5 xs:mt-10">
          <span className="bg-ink px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-paper xs:px-6 xs:py-3.5 xs:text-xs">
            No Spectators. You&rsquo;re Part of the Crew.
          </span>
        </div>
      </div>
    </section>
  );
}
