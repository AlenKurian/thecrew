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
      className="bg-paper px-4 pt-8 pb-16 text-ink xs:px-6 xs:pt-12 xs:pb-24 sm:px-10 sm:pt-16 sm:pb-32"
    >
      <div className="mb-10 flex items-start justify-between gap-6 xs:mb-14 sm:mb-16">
        <h2 className="benefits-heading font-display text-[6.6vw] uppercase leading-[0.95] xs:text-[9vw] sm:text-[5vw]">
          We&rsquo;ve <span className="text-ink/45">Got You</span>
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

      <ul className="flex flex-col gap-4 xs:gap-5">
        {included.map((item) => (
          <li
            key={item.title}
            className="benefit-item relative flex min-h-[96px] items-stretch overflow-hidden rounded-[2rem] border border-ink/10 bg-paper xs:min-h-[130px] xs:rounded-[2.5rem] sm:min-h-[150px]"
          >
            <span className="flex shrink-0 items-center px-4 font-display text-xl text-ink/30 xs:px-6 xs:text-2xl sm:px-8 sm:text-4xl">
              {item.number}
            </span>
            <span className="w-px shrink-0 self-center bg-ink/15" style={{ height: "60%" }} />
            <div
              className="relative flex shrink-0 items-center justify-center bg-ink/5 px-5 xs:px-8 sm:px-10"
              style={{
                clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
              }}
            >
              <BenefitIcon
                name={item.icon}
                className="h-7 w-7 text-ink xs:h-8 xs:w-8 sm:h-10 sm:w-10"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-5 xs:px-8 sm:px-10">
              <span className="font-display text-sm uppercase leading-tight xs:text-[4.5vw] sm:text-[2.2vw]">
                {item.title}
              </span>
              <span className="text-xs text-ink/60 xs:text-sm">
                {item.description}
              </span>
            </div>
          </li>
        ))}
      </ul>

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
