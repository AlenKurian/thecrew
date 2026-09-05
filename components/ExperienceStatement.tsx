"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

const negatives = ["Not a desk.", "Not a classroom.", "Not a simulation."];
const positives = ["Real people.", "Real work.", "Real connections."];

export default function ExperienceStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".neg-line").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0.15, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
            delay: i * 0.1,
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".pos-line").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ink px-4 py-16 xs:px-6 xs:py-28 sm:px-10 sm:py-40"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 xs:gap-16 sm:gap-24">
        <div className="flex flex-col gap-1 sm:gap-2">
          {negatives.map((line) => (
            <h2
              key={line}
              className="neg-line font-display text-[8.5vw] uppercase leading-[1] text-paper/30 xs:text-[10vw] sm:text-[5.5vw]"
            >
              {line}
            </h2>
          ))}
        </div>

        <div className="flex flex-col gap-1 sm:gap-2">
          {positives.map((line) => (
            <h2
              key={line}
              className="pos-line font-display text-[10vw] uppercase leading-[1] text-paper xs:text-[12vw] sm:text-[7vw]"
            >
              {line.includes("Real") ? (
                <>
                  <span className="text-paper">Real</span>
                  {line.replace("Real", "")}
                </>
              ) : (
                line
              )}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
