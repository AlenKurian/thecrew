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
      </div>

      <h2 className="location-reveal relative font-display text-[4.4vw] uppercase leading-[0.95] text-paper xs:text-[6vw] sm:text-[2.4vw]">
        Not For Everyone.{" "}
        <span className="mt-2 block text-paper/80 xs:mt-3 sm:mt-0 sm:inline">
          And That&rsquo;s The Point.
        </span>
      </h2>

      <p className="location-reveal relative mx-auto mt-5 max-w-xl text-sm leading-relaxed text-paper/70 xs:mt-6 sm:text-base">
        THE CREW&trade; is intentionally selective. We&rsquo;re looking for
        people who are curious, responsible, hands-on, detail-driven,
        collaborative, and ready to contribute.
      </p>
    </section>
  );
}
