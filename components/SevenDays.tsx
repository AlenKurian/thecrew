"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

export default function SevenDays() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".seven-copy",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-paper px-4 pt-8 pb-8 text-center text-ink xs:px-6 xs:pt-12 xs:pb-12 sm:pt-16 sm:pb-16"
    >
      <div
        ref={numberRef}
        className="font-display leading-none text-[42vw] text-ink xs:text-[46vw] sm:text-[32vw] lg:text-[22vw]"
        aria-hidden="true"
      >
        07
      </div>
      <span className="font-meta -mt-4 text-xs text-paper xs:-mt-6 xs:text-sm sm:-mt-10 sm:text-lg">
        Days
      </span>

      <p className="seven-copy mt-6 max-w-lg text-[13px] leading-relaxed text-ink/80 xs:mt-10 xs:text-lg sm:mt-14 sm:text-lg">
        For 7 days, you&rsquo;ll work alongside the Studio Wytes team and
        experience what it takes to build, produce, and execute a live event
        from the inside.
      </p>

      <div className="seven-copy mt-10 max-w-4xl xs:mt-14 sm:mt-20">
        <h3 className="font-display text-2xl uppercase text-ink xs:text-3xl sm:text-4xl">
          Where the real <span className="text-muted">work happens</span>
        </h3>
        <p className="mt-4 text-[11px] leading-relaxed text-ink/80 xs:text-lg sm:mt-6 sm:text-xl">
          Forget passive learning. Forget theory without execution. THE CREW&trade;
          puts you closer to the decisions, pressure, creativity, systems, and
          people behind real-world production. You&rsquo;ll collaborate across
          disciplines, contribute to active work, solve problems in real time,
          and experience what it takes to move an idea from concept to execution.
        </p>
        <p className="font-meta mt-6 text-[11px] uppercase tracking-wide text-ink xs:text-base sm:mt-8">
          Real people &bull; Real deadlines &bull; Real pressure &bull; Real responsibility
        </p>
      </div>
    </section>
  );
}
