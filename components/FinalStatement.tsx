"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[60vh] flex-col items-center justify-center bg-ink px-4 py-20 text-center xs:px-6 xs:py-28 sm:py-40"
    >
      <h2 className="font-display leading-[0.95]">
        <span className="final-line block text-[11vw] uppercase text-paper xs:text-[13vw] sm:text-[8vw]">
          Come Curious.
        </span>
        <span className="final-line block text-[11vw] uppercase text-crew-orange xs:text-[13vw] sm:text-[8vw]">
          Leave Connected.
        </span>
      </h2>

      <p className="final-line mt-6 max-w-md text-sm text-paper/70 xs:mt-8 xs:text-base sm:mt-10 sm:text-lg">
        Seven days can change who you know, what you know, and how you see
        the work.
      </p>
    </section>
  );
}
