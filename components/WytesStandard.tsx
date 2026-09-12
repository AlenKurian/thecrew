"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { wytesStandardPrinciples } from "@/lib/utils";

export default function WytesStandard() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wytes-standard-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".wytes-standard-reveal",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper px-4 py-20 xs:px-6 xs:py-28 sm:px-10 sm:py-40"
    >
      <div className="wytes-standard-reveal mx-auto flex w-full max-w-[110rem] flex-col items-center text-center">
        <span className="font-meta -mt-4 mb-6 block text-[10px] text-ink/60 xs:-mt-6 xs:mb-8 xs:text-[11px]">
          The Wytes Standard&trade;
        </span>
        <h2 className="font-display text-[5vw] uppercase leading-[0.95] text-ink xs:text-[6.7vw] sm:text-[3vw]">
          Different work.{" "}
          <span className="mt-2.5 block text-ink/45 xs:mt-3 sm:mt-0 sm:inline">
            Higher expectations.
          </span>
        </h2>
        <div className="mt-10 flex w-full max-w-4xl flex-wrap items-center justify-center gap-3 xs:mt-14 xs:gap-4">
          {wytesStandardPrinciples.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 xs:gap-3 xs:px-6 xs:py-4"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper font-meta text-[9px] text-ink xs:h-6 xs:w-6 xs:text-[10px]">
                {i + 1}
              </span>
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] text-paper xs:text-sm">
                {item}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-[12px] leading-relaxed text-ink/80 xs:mt-8 xs:text-base sm:text-lg">
          THE WYTES STANDARD&trade; is about intentional thinking, precision,
          discipline, ownership, collaboration, and professional execution.
        </p>
      </div>
    </section>
  );
}
