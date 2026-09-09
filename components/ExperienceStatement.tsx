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
      className="bg-ink px-4 py-16 xs:px-6 xs:py-28 sm:px-10 sm:py-40"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 xs:gap-20 sm:gap-24">
        <div className="flex flex-col">
          <span className="standard-reveal font-meta mb-3 block text-[10px] text-paper/60 xs:mb-4 xs:text-[11px]">
            The Wytes Standard&trade;
          </span>
          <h2 className="standard-reveal font-display text-[8.5vw] uppercase leading-[0.95] text-paper xs:text-[9vw] sm:text-[3.6vw]">
            Different work. Higher expectations.
          </h2>
          <p className="standard-reveal font-meta mt-5 text-sm uppercase tracking-wide text-paper xs:mt-6 xs:text-base">
            The thinking &bull; The preparation &bull; The execution &bull; The
            discipline &bull; The finish
          </p>
          <p className="standard-reveal mt-5 text-[13px] leading-relaxed text-paper/80 xs:mt-6 xs:text-lg sm:text-xl">
            It means approaching every idea with intention, every detail with
            precision, and every execution with accountability. For THE CREW&trade;,
            that standard becomes part of the experience — you won&rsquo;t simply
            be shown how things are done, you&rsquo;ll experience the standard
            behind how we do them.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="standard-reveal font-display text-[7vw] uppercase leading-[0.95] text-paper xs:text-[7.5vw] sm:text-[3vw]">
            Think beyond ordinary.
          </p>
          <span className="standard-reveal font-meta mt-4 block text-[10px] uppercase tracking-wide text-paper/60 xs:text-[11px]">
            The Wytes Standard&trade; is built on
          </span>
          <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 sm:mt-8">
            {principles.map((p, i) => (
              <li key={p.title} className="standard-reveal flex gap-3">
                <span className="font-display text-lg text-paper/40 xs:text-xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col">
                  <span className="font-meta text-sm uppercase tracking-wide text-paper xs:text-base">
                    {p.title}
                  </span>
                  <span className="mt-1 text-sm text-paper/70 xs:text-base">
                    {p.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <span className="standard-reveal font-meta mt-8 block text-[10px] uppercase tracking-wide text-paper/60 xs:text-[11px]">
            THE CREW&trade; — STUDIO WYTES&trade;
          </span>
        </div>
      </div>
    </section>
  );
}
