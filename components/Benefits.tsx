"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { included } from "@/lib/utils";
import BenefitIcon from "./BenefitIcon";
import NumberedRow from "./NumberedRow";

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
      <div className="mb-10 flex items-start justify-between gap-6 xs:mb-14 sm:mb-16">
        <h2 className="benefits-heading font-display text-[10vw] uppercase leading-[0.95] xs:text-[11vw] sm:text-[6vw]">
          We&rsquo;ve Got
          <br />
          You
        </h2>
        <div className="mt-2 hidden shrink-0 flex-col gap-2 text-right sm:flex">
          <span className="h-px w-8 self-end bg-ink/30" />
          <span className="font-meta text-[11px] leading-relaxed text-ink/50">
            Same
            <br />
            People
            <br />
            Bigger
            <br />
            Possibilities
          </span>
        </div>
      </div>

      <div className="border-b border-ink/15">
        {included.map((item) => (
          <NumberedRow
            key={item.title}
            className="benefit-item"
            tone="onPaper"
            number={item.number}
            title={item.title}
            description={item.description}
            media={
              <BenefitIcon
                name={item.icon}
                className="h-7 w-7 text-ink xs:h-8 xs:w-8 sm:h-9 sm:w-9"
              />
            }
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-6 xs:mt-14 sm:mt-16">
        <div className="flex flex-col gap-2">
          <span className="h-px w-8 bg-ink/30" />
          <span className="font-meta text-[11px] uppercase leading-relaxed text-ink/50">
            More Than an Opportunity
            <br />A Creative Journey
          </span>
        </div>
        <span className="hidden items-center gap-3 xs:flex">
          <span className="font-display text-xl text-ink/30">{'//'}</span>
          <span className="h-px w-16 bg-ink/30" />
        </span>
      </div>
    </section>
  );
}
