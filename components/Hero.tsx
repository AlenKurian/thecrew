"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        0.5
      )
        .fromTo(
          ".hero-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.12 },
          0.7
        )
        .fromTo(
          ".hero-sub",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

      // Subtle background breathing — no distracting parallax.
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 3.5, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-[70svh] w-full flex-col justify-end overflow-hidden bg-ink px-4 pb-8 pt-24 xs:min-h-[80svh] xs:px-6 xs:pt-28 sm:min-h-[100svh] sm:px-10 sm:pb-14 sm:pt-32"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-ink/20" />
      </div>


      {/* Main headline */}
      <div className="max-w-5xl">
        <h1 className="font-display text-paper leading-[0.95]">
          <span className="line-clip block">
            <span className="hero-line block text-[12vw] xs:text-[14vw] sm:text-[9vw] lg:text-[7.5vw]">
              7 DAYS.
            </span>
          </span>
          <span className="line-clip block">
            <span className="hero-line block text-[12vw] xs:text-[14vw] sm:text-[9vw] lg:text-[7.5vw]">
              ONE EXPERIENCE.
            </span>
          </span>
          <span className="line-clip block">
            <span className="hero-line block text-crew-orange text-[10.5vw] xs:text-[12.5vw] sm:text-[8.5vw] lg:text-[7vw]">
              A ROOM FULL OF POSSIBILITY.
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-4 max-w-md text-sm text-paper/85 xs:text-base sm:mt-8 sm:text-lg">
          We&rsquo;re looking for people who want to be in the room where it
          happens.
        </p>

        <div className="hero-cta mt-6 flex flex-wrap items-center gap-5 sm:mt-10">
          <a
            href="#apply"
            className="group inline-flex items-center gap-2 bg-crew-orange px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:bg-paper xs:px-7 xs:py-4 xs:text-xs sm:px-8 sm:py-5 sm:text-sm"
          >
            Apply for the Crew
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll font-meta absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-paper/60 xs:bottom-6 xs:right-6 xs:text-[11px] sm:bottom-10 sm:right-10">
        <span>Scroll to enter</span>
        <span className="animate-bounce">↓</span>
      </div>
    </section>
  );
}
