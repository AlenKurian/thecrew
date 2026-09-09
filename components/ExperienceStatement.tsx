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
      className="bg-paper px-4 pt-16 pb-8 xs:px-6 xs:pt-28 xs:pb-12 sm:px-10 sm:pt-40 sm:pb-16"
    >
      <div className="standard-reveal mx-auto flex w-full max-w-[110rem] flex-col gap-10 rounded-[1.5rem] border border-ink/10 bg-ink p-5 xs:gap-20 xs:rounded-[2.5rem] xs:p-8 sm:gap-24 sm:p-14">
        <div className="flex flex-col items-center text-center">
          <span className="font-meta mb-2 block text-[9px] text-paper/60 xs:mb-4 xs:text-[11px]">
            The Wytes Standard&trade;
          </span>
          <h2 className="font-display text-[7vw] uppercase leading-[0.95] text-paper xs:text-[9vw] sm:text-[3.6vw]">
            Different work. Higher expectations.
          </h2>
          <p className="font-meta mt-4 text-[11px] uppercase tracking-wide text-paper xs:mt-6 xs:text-base">
            The thinking &bull; The preparation &bull; The execution &bull; The
            discipline &bull; The finish
          </p>
          <p className="mt-4 max-w-3xl text-[12px] leading-relaxed text-paper/80 xs:mt-6 xs:text-lg sm:text-lg">
            It means approaching every idea with intention, every detail with
            precision, and every execution with accountability. For THE CREW&trade;,
            that standard becomes part of the experience — you won&rsquo;t simply
            be shown how things are done, you&rsquo;ll experience the standard
            behind how we do them.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="font-display text-[6vw] uppercase leading-[0.95] text-paper xs:text-[7.5vw] sm:text-[3vw]">
            Think beyond ordinary.
          </p>
          <span className="font-meta mt-3 block text-[9px] uppercase tracking-wide text-paper/60 xs:text-[11px]">
            The Wytes Standard&trade; is built on
          </span>
          <ol className="mt-5 grid w-full max-w-4xl gap-x-8 gap-y-5 sm:grid-cols-2 sm:mt-8">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="flex items-start gap-3 text-left sm:flex-col sm:items-center sm:gap-0 sm:text-center"
              >
                <span className="font-display text-base text-paper/40 xs:text-lg sm:text-xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col sm:mt-1 sm:items-center">
                  <span className="font-meta text-[12px] uppercase tracking-wide text-paper xs:text-base">
                    {p.title}
                  </span>
                  <span className="mt-1 max-w-[34ch] text-pretty text-[12px] leading-relaxed text-paper/70 [text-wrap:balance] xs:text-base">
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
