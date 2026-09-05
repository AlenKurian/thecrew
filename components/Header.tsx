"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/apply";
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 xs:px-6 xs:py-4 sm:px-10 sm:py-5 backdrop-blur-sm bg-ink/40"
    >
      <a
        href="#top"
        className="font-display text-base tracking-tight text-paper xs:text-lg sm:text-xl"
      >
        STUDIO WYTES<sup className="relative top-[1em] align-top text-[0.4em]">™</sup>
      </a>

      <div className="flex items-center gap-3 xs:gap-4 sm:gap-8">
        <div className="hidden flex-col items-end gap-0.5 sm:flex">
          <span className="font-meta text-[10px] text-paper">
            The Crew
          </span>
          <span className="font-meta text-[10px] text-paper/60">
            Calicut • Kerala
          </span>
        </div>
        <a
          href="#apply"
          onClick={scrollToApply}
          className="group inline-flex items-center gap-1.5 text-[10px] xs:text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-ink bg-paper px-3.5 py-2 xs:px-4 xs:py-2.5 sm:px-5 sm:py-3 hover:bg-paper/80 transition-colors duration-300"
        >
          Apply
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </header>
  );
}
