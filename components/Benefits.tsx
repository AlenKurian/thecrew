"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { included } from "@/lib/utils";
import BenefitIcon from "./BenefitIcon";

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefits-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".benefit-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper px-4 py-16 text-ink xs:px-6 xs:py-24 sm:px-10 sm:py-32"
    >
      <div className="grid grid-cols-1 gap-8 xs:gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
        <h2 className="benefits-heading font-display text-[10vw] uppercase leading-[0.95] xs:text-[11vw] sm:text-[6vw] lg:sticky lg:top-32 lg:self-start">
          We&rsquo;ve Got
          <br />
          You <span className="text-paper">Covered.</span>
        </h2>

        <ul className="flex flex-col">
          {included.map((item) => (
            <li
              key={item.number}
              className="benefit-item flex items-center gap-4 border-t border-ink/15 py-4 last:border-b xs:gap-6 xs:py-6 sm:gap-10 sm:py-8"
            >
              <span className="font-display text-xl text-paper xs:text-2xl sm:text-4xl">
                {item.number}
              </span>
              <BenefitIcon
                name={item.icon}
                className="h-6 w-6 shrink-0 text-ink xs:h-7 xs:w-7 sm:h-9 sm:w-9"
              />
              <div className="flex flex-col gap-1">
                <span className="font-display text-[5.5vw] uppercase leading-tight xs:text-[5.5vw] sm:text-[2.4vw]">
                  {item.title}
                </span>
                <span className="text-xs text-ink/60 xs:text-sm">
                  {item.description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
