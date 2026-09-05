"use client";

export default function Footer() {
  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-paper/15 bg-ink px-4 py-8 xs:px-6 xs:py-10 sm:px-10 sm:py-14">
      <h2 className="font-display text-[11vw] uppercase leading-none text-paper xs:text-[13vw] sm:text-[7vw]">
        Studio Wytes<sup className="text-[0.35em]">™</sup>
      </h2>

      <p className="mt-4 max-w-md font-display text-[5vw] uppercase leading-[1.1] text-paper/70 xs:mt-6 xs:text-[5vw] sm:text-2xl">
        Create the experience.
        <br />
        Become part of the story.
      </p>

      <div className="mt-8 flex flex-col gap-6 xs:mt-12 xs:gap-8 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
        <span className="text-[10px] font-meta text-paper/50 xs:text-[11px]">
          Calicut • Kerala
        </span>

        <a
          href="#apply"
          onClick={scrollToApply}
          className="group inline-flex items-center gap-2 border border-paper/30 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-300 hover:border-crew-orange hover:text-crew-orange xs:px-7 xs:py-4 xs:text-xs"
        >
          Apply for the Crew
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      <div className="font-meta mt-10 flex flex-col-reverse gap-4 border-t border-paper/10 pt-6 text-[10px] tracking-[0.15em] text-paper/30 xs:mt-16 xs:text-[11px] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Studio Wytes™. All rights reserved.</span>
        <span>Get in the room.</span>
      </div>
    </footer>
  );
}
