"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

const principles = [
  {
    title: "Intentional Thinking",
    body: "We question the obvious and find the opportunity others overlook.",
  },
  {
    title: "Creative Excellence",
    body: "Ideas matter only when built with clarity, relevance, and purpose.",
  },
  {
    title: "Precision in Execution",
    body: "Great concepts mean nothing without disciplined, flawless delivery.",
  },
  {
    title: "Ownership",
    body: "Take full responsibility for the work, the details, and the outcome.",
  },
  {
    title: "Collaboration",
    body: "The strongest work emerges when disciplines move as one.",
  },
  {
    title: "Professionalism",
    body: "How you communicate, prepare, and deliver matters every day.",
  },
];

export default function ExperienceStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".standard-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".standard-reveal",
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
      className="bg-ink px-4 pt-16 pb-8 xs:px-6 xs:pt-28 xs:pb-12 sm:px-10 sm:pt-40 sm:pb-16"
    >
      <div className="standard-reveal mx-auto flex w-full max-w-[110rem] flex-col bg-ink">
        <div className="flex flex-col sm:items-center sm:text-center">
          <p className="font-display text-center text-[5vw] uppercase leading-[0.95] text-paper xs:text-[5.8vw] sm:text-[2.5vw]">
            Think <span className="text-paper/80">beyond ordinary.</span>
          </p>
          <span className="font-meta mt-2 block text-center text-[9px] uppercase tracking-wide text-paper/60 xs:mt-3 xs:text-[11px]">
            The Wytes Standard&trade; is built on
          </span>
          <ol className="mt-5 border-t border-paper/15 xs:mt-8 sm:mt-8 sm:grid sm:w-full sm:max-w-4xl sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 sm:border-t-0">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="flex items-center gap-3 border-b border-paper/15 py-4 xs:gap-6 xs:py-7 sm:flex-col sm:items-center sm:gap-0 sm:border-b-0 sm:py-0 sm:text-center"
              >
                <span className="font-display shrink-0 text-3xl text-paper/25 xs:text-4xl sm:text-xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-12 w-px shrink-0 bg-paper/20 xs:h-16 sm:hidden" />
                <span className="flex flex-col sm:mt-1 sm:items-center">
                  <span className="font-meta text-[12px] uppercase tracking-[0.15em] text-paper xs:text-sm sm:text-base sm:tracking-wide">
                    {p.title}
                  </span>
                  <span className="mt-1 text-[11px] leading-relaxed text-paper/70 xs:text-sm sm:max-w-[34ch] sm:text-base">
                    {p.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
