"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { disciplines } from "@/lib/utils";

const fallbackImages = [
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1400&auto=format&fit=crop",
];

// Bento spans for a 6-column grid — one tall featured tile on the left
// (spans two rows) paired with a wide card on the right, then a row of
// two half-width cards, then a row of three, so the whole block reads
// as a single clean rectangle made of differently shaped cards.
const spans = [
  "sm:col-span-6 lg:col-span-2 lg:row-span-2", // 0 — featured, tall
  "sm:col-span-6 lg:col-span-4", // 1 — wide
  "sm:col-span-3 lg:col-span-2", // 2 — half
  "sm:col-span-3 lg:col-span-2", // 3 — half
  "sm:col-span-2", // 4 — third
  "sm:col-span-2", // 5 — third
  "sm:col-span-2", // 6 — third
];

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
    <section
      ref={sectionRef}
      className="bg-ink px-4 py-16 xs:px-6 xs:py-24 sm:px-10 sm:py-32"
    >
      <span className="mb-6 block text-[10px] font-meta text-paper/60 xs:mb-10 xs:text-[11px] sm:mb-16">
        You&rsquo;ll Get Close To
      </span>

      <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:grid-cols-6 sm:gap-5">
        {disciplines.map((item, i) => (
          <div
            key={item.title}
            className={`discipline-card group relative isolate min-h-[160px] overflow-hidden border border-paper/15 xs:min-h-[220px] sm:min-h-[260px] ${
              spans[i] ?? ""
            }`}
          >
            <Image
              src={fallbackImages[i]}
              alt={`${item.title} at Studio Wytes`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-4 xs:p-6 sm:p-8">
              <span className="font-meta text-[10px] text-crew-orange xs:text-[11px]">
                {item.number}
              </span>
              <h3 className="mt-2 font-display text-[6vw] uppercase leading-none text-paper xs:text-[6vw] sm:text-[2.2vw] lg:text-[1.8vw]">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
