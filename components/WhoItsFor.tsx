"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { audience } from "@/lib/utils";

/**
 * Three horizontal rows of tiles, each scrolling continuously in the
 * opposite direction from the row above/below it — a mosaic of "who
 * belongs in the room" rather than a plain list. Every term from the
 * shared `audience` list (lib/utils.ts) appears exactly once, split
 * across the three rows in order, plus a closing "You?" prompt — so
 * the full roster is always readable on screen, not buried in repeats.
 * The seamless marquee loop still duplicates each row's track once,
 * but never pads a row with the same word twice. One tile is
 * highlighted solid, one outlined, to give the wall the same rhythm as
 * a call sheet with a couple of names circled.
 */
type Tile = { label: string; variant?: "solid" | "outline" };

const rows: Tile[][] = [
  [
    { label: audience[0] }, // Students
    { label: audience[1], variant: "solid" }, // Creators
    { label: audience[2] }, // Marketers
  ],
  [
    { label: audience[3] }, // Storytellers
    { label: audience[4] }, // Event Enthusiasts
    { label: audience[5] }, // Young Professionals
  ],
  [
    { label: audience[6] }, // Entrepreneurs
    { label: "You?", variant: "outline" },
  ],
];

// Row 0 moves right→left, row 1 moves left→right, row 2 right→left again.
const directions: ("left" | "right")[] = ["left", "right", "left"];
const durations = [34, 40, 30]; // seconds per full loop — slightly offset per row

function Tile({ tile }: { tile: Tile }) {
  return (
    <div
      className={`flex shrink-0 items-center border px-4 py-4 font-sans text-sm leading-tight xs:px-6 xs:py-6 xs:text-lg sm:px-8 sm:text-xl ${
        tile.variant === "solid"
          ? "border-crew-orange bg-crew-orange text-ink"
          : tile.variant === "outline"
            ? "border-crew-orange text-crew-orange"
            : "border-paper/15 text-paper/90"
      }`}
    >
      {tile.label}
    </div>
  );
}

export default function WhoItsFor() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".who-heading-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".who-row",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      // Continuous horizontal scroll per row, alternating direction —
      // purely decorative, gives the grid a "living wall" feel without
      // ever distracting from the words themselves.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion) {
        trackRefs.current.forEach((track, i) => {
          if (!track) return;
          const dir = directions[i % directions.length];
          const duration = durations[i % durations.length];

          // Track contains two copies of the row back-to-back, so
          // animating exactly -50% (or 0% -> -50% reversed) loops
          // seamlessly regardless of direction.
          if (dir === "left") {
            gsap.fromTo(
              track,
              { xPercent: 0 },
              { xPercent: -50, duration, ease: "none", repeat: -1 }
            );
          } else {
            gsap.fromTo(
              track,
              { xPercent: -50 },
              { xPercent: 0, duration, ease: "none", repeat: -1 }
            );
          }
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink px-4 py-16 xs:px-6 xs:py-24 sm:px-10 sm:py-32"
    >
      {/* Documentary background bleed — faint, dark-washed, non-distracting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:gap-10 lg:gap-16">
        <div className="px-0 xs:px-1 sm:w-2/5 sm:shrink-0 sm:px-5">
          <span className="who-heading-reveal font-meta mb-3 block text-[10px] text-paper/60 xs:mb-4 xs:text-[11px]">
            The Room Is For
          </span>
          <h2 className="who-heading-reveal max-w-xl font-display text-[8.5vw] uppercase leading-[0.95] text-paper xs:text-[9vw] sm:text-[3.6vw]">
            People who&rsquo;d rather be in it than read about it.
          </h2>
        </div>

        {/* Tile rows — each scrolls continuously, alternating direction */}
        <div className="relative mt-8 flex flex-1 flex-col justify-center gap-2 overflow-hidden xs:mt-14 xs:gap-3 sm:mt-0 sm:gap-5">
          {rows.map((row, i) => (
            <div
              key={i}
              className="who-row -mx-4 overflow-hidden xs:-mx-6 sm:mx-0"
            >
              <div
                ref={(el) => {
                  trackRefs.current[i] = el;
                }}
                className="flex w-max gap-2 px-4 xs:gap-3 xs:px-6 sm:gap-5 sm:px-0"
              >
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 gap-2 xs:gap-3 sm:gap-5">
                    {row.map((tile, j) => (
                      <Tile key={`${copy}-${tile.label}-${j}`} tile={tile} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
