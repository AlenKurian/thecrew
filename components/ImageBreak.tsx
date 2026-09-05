"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

export default function ImageBreak() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        ".image-break-overlay",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[50vh] w-full overflow-hidden xs:h-[70vh] sm:h-[90vh]"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2400&auto=format&fit=crop"
          alt="Studio Wytes production crew working behind the scenes on a live event set in Calicut, Kerala"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      <div className="image-break-overlay absolute inset-0 flex items-center justify-center px-4 text-center xs:px-5">
        <h2 className="font-display text-[10vw] uppercase leading-[0.95] text-paper drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] xs:text-[12vw] sm:text-[6vw]">
          This Is the Room.
        </h2>
      </div>

      <div className="absolute bottom-5 left-4 flex flex-col gap-1 xs:bottom-8 xs:left-6 sm:bottom-12 sm:left-10">
        <span className="text-[10px] font-meta text-paper xs:text-[11px]">
          Calicut • Kerala
        </span>
      </div>
      <div className="absolute bottom-5 right-4 xs:bottom-8 xs:right-6 sm:bottom-12 sm:right-10">
        <span className="font-display text-xs uppercase tracking-wide text-paper xs:text-sm">
          Studio Wytes<sup className="relative -top-[0.6em] text-[0.6em]">™</sup>
        </span>
      </div>
    </section>
  );
}
