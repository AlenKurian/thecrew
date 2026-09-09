"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full border border-paper/15 bg-paper/[0.03] px-4 pb-4 pt-9 text-sm text-paper placeholder:text-transparent focus:border-paper/60 focus:outline-none transition-colors duration-300";

export default function ApplicationForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ApplicationInput) => {
    setState("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setServerError(
          json.error || "Something went wrong. Please try again."
        );
        setState("error");
        return;
      }

      reset();
      setState("success");
    } catch {
      setServerError(
        "We couldn't reach the server. Check your connection and try again."
      );
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center xs:py-20">
        <span className="text-[10px] font-meta text-paper xs:text-[11px]">
          Success
        </span>
        <h3 className="mt-3 font-display text-[9vw] uppercase leading-[0.95] text-paper xs:mt-4 xs:text-[10vw] sm:text-[5vw]">
          Application Received
        </h3>
        <p className="mt-4 max-w-sm text-sm text-paper/70 xs:mt-6 xs:text-base sm:text-lg">
          We&rsquo;ll be in touch.
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            document
              .getElementById("top")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group mt-8 inline-flex items-center gap-2 border border-paper/30 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-300 hover:border-paper xs:mt-10 xs:px-7 xs:py-4 xs:text-xs"
        >
          Back to the Experience
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <div ref={formTopRef} className="mt-8 xs:mt-10 sm:mt-14">
      <div className="border border-paper/15 bg-paper/[0.02] p-6 xs:p-8 sm:p-10">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-paper xs:text-sm">
          Apply to THE CREW&trade;
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 xs:mt-10"
        >
          <div className="grid grid-cols-1 gap-5 xs:gap-6 sm:grid-cols-2">
            <Field
              id="fullName"
              label="Full Name"
              error={errors.fullName?.message}
            >
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                className={fieldBase}
                placeholder="Full Name"
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
            </Field>

            <Field id="email" label="Email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={fieldBase}
                placeholder="Email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </Field>

            <Field id="phone" label="Phone" error={errors.phone?.message}>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className={fieldBase}
                placeholder="Phone"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </Field>

            <Field
              id="city"
              label="City / Country"
              error={errors.city?.message}
            >
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                className={fieldBase}
                placeholder="City / Country"
                aria-invalid={!!errors.city}
                {...register("city")}
              />
            </Field>

            <Field
              id="role"
              label="Role / Profession"
              error={errors.role?.message}
            >
              <input
                id="role"
                type="text"
                className={fieldBase}
                placeholder="Role / Profession"
                aria-invalid={!!errors.role}
                {...register("role")}
              />
            </Field>

            <Field
              id="portfolioUrl"
              label="LinkedIn / Portfolio"
              error={errors.portfolioUrl?.message}
            >
              <input
                id="portfolioUrl"
                type="url"
                className={fieldBase}
                placeholder="LinkedIn / Portfolio"
                aria-invalid={!!errors.portfolioUrl}
                {...register("portfolioUrl")}
              />
            </Field>

            <Field
              id="skills"
              label="Area of Interest"
              error={errors.skills?.message}
              className="sm:col-span-2"
            >
              <input
                id="skills"
                type="text"
                className={fieldBase}
                placeholder="Area of Interest"
                aria-invalid={!!errors.skills}
                {...register("skills")}
              />
            </Field>

            <Field
              id="whyJoin"
              label="What drives you to create?"
              error={errors.whyJoin?.message}
              className="sm:col-span-2"
            >
              <textarea
                id="whyJoin"
                rows={3}
                className={cn(fieldBase, "resize-none")}
                placeholder="What drives you to create?"
                aria-invalid={!!errors.whyJoin}
                {...register("whyJoin")}
              />
            </Field>
          </div>

          {state === "error" && serverError && (
            <div
              role="alert"
              className="mt-8 border border-paper/60 bg-paper/10 px-5 py-4 text-sm text-paper"
            >
              {serverError}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-2 bg-paper px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-paper/80 disabled:cursor-not-allowed disabled:opacity-60 xs:text-sm sm:w-auto sm:px-14"
            >
              {isSubmitting
                ? "Submitting…"
                : state === "error"
                  ? "Try Again"
                  : "Submit Application"}
              {!isSubmitting && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-paper/40 xs:text-sm">
            Selective applications. Limited positions. Further details will be
            shared directly via email.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative flex flex-col", className)}>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-[11px] font-meta uppercase tracking-[0.15em] text-paper/40"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          className="mt-2 text-xs font-medium text-paper underline underline-offset-2"
        >
          {error}
        </p>
      )}
    </div>
  );
}
