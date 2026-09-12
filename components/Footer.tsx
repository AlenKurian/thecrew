export default function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-paper px-4 py-8 xs:px-6 xs:py-10 sm:px-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <h2 className="font-display text-[4.6vw] uppercase leading-none text-ink xs:text-[6vw] sm:text-3xl">
          Studio Wytes<sup className="relative top-[0.58em] align-top text-[1.05em]">™</sup>
        </h2>

        <p className="max-w-md font-display text-[3.4vw] uppercase leading-[1.1] text-ink/45 xs:text-[4.2vw] sm:text-right sm:text-xl">
          Come curious. Think big.
          <br />
          Build with purpose.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 xs:mt-8 xs:gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
        <span className="text-[10px] font-meta uppercase tracking-[0.1em] text-ink/50 xs:text-[11px]">
          The Wytes Standard&trade; | The Crew&trade; by Studio Wytes&trade;
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
