"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

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
        <span className="font-meta mb-2 block text-[10px] text-ink/60 xs:mb-4 xs:text-[11px]">
          The Wytes Standard&trade;
        </span>
        <h2 className="font-display text-[6.2vw] uppercase leading-[0.95] text-ink xs:text-[6.7vw] sm:text-[3vw]">
          Different work.{" "}
          <span className="mt-2.5 block text-muted xs:mt-3 sm:mt-0 sm:inline">
            Higher expectations.
          </span>
        </h2>
        <p className="font-meta mt-3 text-[10px] uppercase tracking-wide text-ink xs:mt-6 xs:text-sm sm:text-base">
          The thinking &bull; The preparation &bull; The execution &bull; The
          discipline &bull; The finish
        </p>
        <p className="mt-3 max-w-3xl text-[12px] leading-relaxed text-ink/80 xs:mt-6 xs:text-base sm:text-lg">
          It means approaching every idea with intention, every detail with
          precision, and every execution with accountability. For THE CREW&trade;,
          that standard becomes part of the experience — you won&rsquo;t simply
          be shown how things are done, you&rsquo;ll experience the standard
          behind how we do them.
        </p>
      </div>
    </section>
  );
}
