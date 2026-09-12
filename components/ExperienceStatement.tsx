"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

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
          <span className="font-meta mb-3 block text-center text-[10px] text-paper/60 xs:mb-4 xs:text-[11px]">
            From Idea to Live Experience
          </span>
          <p className="mt-5 mx-auto max-w-5xl font-display text-center text-[5vw] uppercase leading-[0.95] text-paper xs:text-[5.5vw] sm:text-[2.5vw]">
            Great events don&rsquo;t simply happen.{" "}
            <span className="text-paper/80"> <br />
              They are imagined, planned, built, coordinated, produced, and
              executed.
            </span>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-[12px] leading-relaxed text-paper/70 xs:mt-12 xs:text-base sm:text-lg">
            THE CREW&trade; gives you proximity to that entire process. You
            experience what happens behind the scenes — where ideas become
            environments, production becomes execution, and teams come
            together to make something real.
          </p>
        </div>
      </div>
    </section>
  );
}
