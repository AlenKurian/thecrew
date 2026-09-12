"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { proximityChangesEverything } from "@/lib/utils";

export default function FinalStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".final-line",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );

      gsap.fromTo(
        ".take-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ink px-4 py-16 xs:px-6 xs:py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[110rem] flex-col items-center justify-center bg-ink px-0 text-center xs:px-6 sm:px-14">
      <span className="final-line font-meta -mt-6 mb-9 block text-[10px] text-paper/60 xs:-mt-8 xs:mb-12 xs:text-[11px]">
        Proximity Changes Everything
      </span>
      <h2 className="font-display leading-[0.95]">
        <span className="final-line block text-[6.2vw] uppercase text-paper xs:text-[8.8vw] sm:text-[3vw]">
          When you get closer to the work,
        </span>
        <span className="final-line mt-2 block text-[6.2vw] uppercase text-paper/80 xs:mt-3 sm:mt-0 sm:text-[3vw]">
          you begin to understand.
        </span>
      </h2>

      <div className="final-line mt-12 grid w-full max-w-4xl grid-cols-1 gap-3 xs:mt-16 sm:mt-20 sm:grid-cols-2 sm:gap-5">
        {proximityChangesEverything.map((item, i) => (
          <div
            key={item}
            className="take-item flex items-start gap-4 border border-paper/15 px-5 py-5 text-left xs:gap-5 xs:px-7 xs:py-7"
          >
            <span className="font-display shrink-0 text-2xl text-paper/25 xs:text-3xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 text-sm text-paper/80 xs:text-base sm:text-lg">
              {item}
            </span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
