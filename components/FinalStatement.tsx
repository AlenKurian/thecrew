"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { whatYouTakeWithYou } from "@/lib/utils";

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
      className="bg-paper px-4 py-16 xs:px-6 xs:py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[110rem] flex-col items-center justify-center rounded-[2rem] border border-ink/10 bg-ink px-4 py-20 text-center xs:rounded-[2.5rem] xs:px-6 xs:py-28 sm:px-14 sm:py-40">
      <h2 className="font-display leading-[0.95]">
        <span className="final-line block text-[11vw] uppercase text-paper xs:text-[13vw] sm:text-[4vw]">
          Come Curious.
        </span>
        <span className="final-line block text-[11vw] uppercase text-paper xs:text-[13vw] sm:text-[5vw]">
          Leave Connected.
        </span>
      </h2>

      <p className="final-line mt-6 max-w-md text-sm text-paper/70 xs:mt-8 xs:text-base sm:mt-10 sm:text-lg">
        Seven days can change who you know, what you know, and how you see
        the work.
      </p>

      <div className="final-line mt-14 w-full max-w-3xl xs:mt-16 sm:mt-20">
        <span className="font-meta mb-6 block text-[10px] text-paper/50 xs:mb-8 xs:text-[11px]">
          What You Take With You
        </span>
        <ul className="flex flex-col divide-y divide-paper/15 border-t border-paper/15">
          {whatYouTakeWithYou.map((item) => (
            <li
              key={item.label}
              className="take-item flex flex-col gap-1 py-4 text-left xs:flex-row xs:items-baseline xs:gap-6 xs:py-5"
            >
              <span className="font-display shrink-0 text-base uppercase text-crew-orange xs:w-48 xs:text-lg">
                {item.label}
              </span>
              <span className="text-sm text-paper/70 xs:text-base">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}
