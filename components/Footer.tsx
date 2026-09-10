export default function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-paper px-4 py-8 xs:px-6 xs:py-10 sm:px-10 sm:py-14">
      <h2 className="font-display text-[7.6vw] uppercase leading-none text-ink xs:text-[8.4vw] sm:text-[4.8vw]">
        Studio Wytes<sup className="relative top-[0.5em] align-top text-[0.4em]">™</sup>
      </h2>

      <p className="mt-3 max-w-md font-display text-[4.2vw] uppercase leading-[1.1] text-muted xs:mt-4 xs:text-[4.2vw] sm:text-xl">
        Create the experience.
        <br />
        Become part of the story.
      </p>

      <div className="mt-6 flex flex-col gap-6 xs:mt-8 xs:gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
        <span className="text-[10px] font-meta text-ink/50 xs:text-[11px]">
          Calicut • Kerala
        </span>
      </div>

      <div className="font-meta mt-6 flex flex-col-reverse gap-4 border-t border-ink/10 pt-6 text-[10px] tracking-[0.15em] text-ink/30 xs:mt-8 xs:text-[11px] sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} Studio Wytes<sup className="relative -top-[0.7em] text-[0.7em]">™</sup>. All
          rights reserved.
        </span>
        <span>Get in the room.</span>
      </div>
    </footer>
  );
}
