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
      className="relative flex flex-col items-center justify-center overflow-hidden bg-paper px-4 py-16 text-center text-ink xs:px-6 xs:py-24 sm:py-32"
    >
      <div
        ref={numberRef}
        className="font-display leading-none text-[50vw] text-ink xs:text-[55vw] sm:text-[38vw] lg:text-[30vw]"
        aria-hidden="true"
      >
        07
      </div>
      <span className="font-meta -mt-4 text-xs text-paper xs:-mt-6 xs:text-sm sm:-mt-10 sm:text-lg">
        Days
      </span>

      <p className="seven-copy mt-6 max-w-lg text-base text-ink/80 xs:mt-10 xs:text-lg sm:mt-14 sm:text-2xl">
        For 7 days, you&rsquo;ll work alongside the Studio Wytes team and
        experience what it takes to build, produce, and execute a live event
        from the inside.
      </p>
    </section>
  );
}
