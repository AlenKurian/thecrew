"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The wytes.studio section-card pattern: a full-width row divided from
 * its neighbours by a single hairline rule, with a large faded mono
 * number on the left and a condensed title + body on the right. On
 * hover the row lifts to a barely-there wash and an arrow slides in —
 * no borders close up, no rounded corners, no drop shadows. Every
 * list/card section on the site composes this so the rhythm is
 * identical everywhere.
 *
 * `tone` flips the palette for sections that sit on paper vs ink.
 */
type NumberedRowProps = {
  number: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional slot rendered between the number and the text (e.g. an icon). */
  media?: ReactNode;
  tone?: "onInk" | "onPaper";
  className?: string;
};

const NumberedRow = forwardRef<HTMLDivElement, NumberedRowProps>(
  ({ number, title, description, media, tone = "onInk", className }, ref) => {
    const onPaper = tone === "onPaper";

    return (
      <div
        ref={ref}
        className={cn(
          "numbered-row group relative flex items-start gap-4 border-t px-1 py-6 transition-colors duration-300 xs:gap-6 xs:py-8 sm:gap-10 sm:py-10",
          onPaper
            ? "border-ink/15 hover:bg-ink/[0.03]"
            : "border-paper/15 hover:bg-paper/[0.03]",
          className
        )}
      >
        <span
          className={cn(
            "font-meta shrink-0 text-xs leading-none tracking-[0.2em] xs:text-sm sm:text-base",
            onPaper ? "text-ink/30" : "text-paper/30"
          )}
        >
          {number}
        </span>

        {media ? <div className="shrink-0">{media}</div> : null}

        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "font-display text-2xl uppercase leading-[0.95] xs:text-3xl sm:text-[2.4vw] lg:text-[2vw]",
              onPaper ? "text-ink" : "text-paper"
            )}
          >
            {title}
          </h3>
          {description ? (
            <p
              className={cn(
                "mt-2 max-w-xl text-xs leading-relaxed xs:mt-3 xs:text-sm sm:text-base",
                onPaper ? "text-ink/60" : "text-paper/60"
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        <span
          className={cn(
            "shrink-0 translate-x-0 self-center text-lg opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 xs:text-xl",
            onPaper ? "text-ink" : "text-paper"
          )}
          aria-hidden="true"
        >
          &rarr;
        </span>
      </div>
    );
  }
);

NumberedRow.displayName = "NumberedRow";

export default NumberedRow;
