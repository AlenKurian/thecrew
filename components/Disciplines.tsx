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
      <span className="mb-6 block px-4 pt-16 text-[10px] font-meta text-paper/60 xs:px-6 xs:pt-24 xs:text-[11px] sm:px-10 sm:pt-32 sm:mb-16">
        You&rsquo;ll Get Close To
      </span>

      {disciplines.map((item, i) => (
        <div
          key={item.title}
          className={`discipline-card flex flex-col border-t border-paper/15 xs:flex-row ${
            i % 2 === 1 ? "xs:flex-row-reverse" : ""
          }`}
        >
          <div className="relative min-h-[180px] w-full overflow-hidden xs:min-h-[420px] xs:w-1/2">
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

          <div className="flex w-full flex-col justify-center px-3 py-5 xs:w-1/2 xs:px-8 xs:py-12 sm:px-14 sm:py-16">
            <div className="mb-2 flex items-center gap-3 xs:mb-6 xs:gap-4">
              <span className="font-meta shrink-0 text-xs leading-none tracking-[0.2em] text-paper/30 xs:text-sm sm:text-base">
                {item.number}
              </span>
              <span className="h-px flex-1 bg-paper/15" />
            </div>

            <h3 className="font-sans text-[6vw] font-semibold uppercase leading-[0.9] text-paper xs:text-[6vw] sm:text-[3vw] lg:text-[2.2vw]">
              {item.title}
            </h3>

            <p className="mt-2 max-w-sm text-xs text-paper/70 xs:mt-5 xs:text-base">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
