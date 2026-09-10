"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { disciplines } from "@/lib/utils";

export default function Disciplines() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".discipline-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ink">
      <span className="mb-4 block px-4 pt-12 text-[9px] font-meta text-paper/60 xs:px-6 xs:pt-24 xs:text-[11px] sm:px-10 sm:pt-32 sm:mb-16">
        You&rsquo;ll Get Close To
      </span>

      {disciplines.map((item, i) => (
        <div
          key={item.title}
          className={`discipline-card flex flex-col border-t border-paper/15 xs:flex-row ${
            i % 2 === 1 ? "xs:flex-row-reverse" : ""
          }`}
        >
          <div className="relative min-h-[130px] w-full overflow-hidden xs:min-h-[280px] xs:w-1/2 sm:min-h-[320px]">
            <Image
              src={item.image}
              alt={`${item.title} at Studio Wytes`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/40 to-transparent xs:inset-x-auto xs:inset-y-0 xs:h-auto xs:w-1/3 xs:bg-gradient-to-r ${
                i % 2 === 1
                  ? "xs:left-0 xs:right-auto xs:from-transparent xs:via-ink/40 xs:to-ink"
                  : "xs:right-0 xs:from-ink xs:via-ink/40 xs:to-transparent"
              }`}
            />
          </div>

          <div className="flex w-full flex-col justify-center px-3 py-5 xs:w-1/2 xs:px-6 xs:py-8 sm:px-10 sm:py-10">
            <div className="mb-2 flex items-center gap-2 xs:mb-4 xs:gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-paper/40 font-meta text-[9px] text-paper xs:h-9 xs:w-9 xs:text-[10px]">
                {item.number}
              </span>
              <span className="h-px flex-1 bg-paper/30" />
            </div>

            <h3 className="font-display text-[5.5vw] uppercase leading-[0.9] text-paper xs:text-[5vw] sm:text-[2.6vw] lg:text-[2vw]">
              {item.title}
            </h3>

            <p className="mt-2 max-w-sm text-[11px] leading-relaxed text-paper/70 xs:mt-3 xs:text-sm sm:text-base">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
