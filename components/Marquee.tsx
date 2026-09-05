const ITEMS = [
  "STUDIO WYTES™",
  "THE CREW",
  "CALICUT",
  "7 DAYS",
  "GET IN THE ROOM",
];

export default function Marquee() {
  const content = (
    <span className="flex items-center">
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="flex items-center whitespace-nowrap px-3 font-display text-[5.5vw] leading-none text-paper xs:px-4 xs:text-[7vw] sm:px-6 sm:text-[3.2vw]"
        >
          {item}
          <span
            className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-crew-orange xs:ml-4 xs:h-2 xs:w-2 sm:ml-6 sm:h-3 sm:w-3"
            aria-hidden="true"
          />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="relative overflow-hidden border-y border-paper/15 bg-ink py-3 xs:py-4 sm:py-6"
      role="presentation"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {content}
        {content}
      </div>
    </div>
  );
}
