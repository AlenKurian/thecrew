"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full border-b border-paper/30 bg-transparent py-3 text-base text-paper placeholder:text-paper/40 focus:border-crew-orange focus:outline-none transition-colors duration-300";

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
        <span className="text-[10px] font-meta text-crew-orange xs:text-[11px]">
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
          className="group mt-8 inline-flex items-center gap-2 border border-paper/30 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-300 hover:border-crew-orange hover:text-crew-orange xs:mt-10 xs:px-7 xs:py-4 xs:text-xs"
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
    <div ref={formTopRef}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 xs:mt-10 sm:mt-14">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 xs:gap-y-8 sm:grid-cols-2">
          <Field
            id="fullName"
            label="Full Name"
            required
            error={errors.fullName?.message}
          >
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              className={fieldBase}
              placeholder="Your name"
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
          </Field>

          <Field id="email" label="Email" required error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={fieldBase}
              placeholder="you@email.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </Field>

          <Field id="phone" label="Phone Number" required error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={fieldBase}
              placeholder="+91 00000 00000"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </Field>

          <Field id="city" label="City" required error={errors.city?.message}>
            <input
              id="city"
              type="text"
              autoComplete="address-level2"
              className={fieldBase}
              placeholder="Where are you based?"
              aria-invalid={!!errors.city}
              {...register("city")}
            />
          </Field>

          <Field
            id="role"
            label="What do you do?"
            required
            error={errors.role?.message}
            className="sm:col-span-2"
          >
            <input
              id="role"
              type="text"
              className={fieldBase}
              placeholder="Student, designer, marketer, filmmaker…"
              aria-invalid={!!errors.role}
              {...register("role")}
            />
          </Field>

          <Field
            id="whyJoin"
            label="Why do you want to be part of THE CREW?"
            required
            error={errors.whyJoin?.message}
            className="sm:col-span-2"
          >
            <textarea
              id="whyJoin"
              rows={4}
              className={cn(fieldBase, "resize-none")}
              placeholder="Tell us what draws you in."
              aria-invalid={!!errors.whyJoin}
              {...register("whyJoin")}
            />
          </Field>

          <div className="sm:col-span-2 mt-2 flex items-center gap-3 text-[11px] font-meta text-paper/40">
            <span className="h-px flex-1 bg-paper/15" />
            Optional
            <span className="h-px flex-1 bg-paper/15" />
          </div>

          <Field
            id="portfolioUrl"
            label="Portfolio URL"
            error={errors.portfolioUrl?.message}
          >
            <input
              id="portfolioUrl"
              type="url"
              className={fieldBase}
              placeholder="https://"
              aria-invalid={!!errors.portfolioUrl}
              {...register("portfolioUrl")}
            />
          </Field>

          <Field
            id="socialUrl"
            label="Instagram / LinkedIn"
            error={errors.socialUrl?.message}
          >
            <input
              id="socialUrl"
              type="url"
              className={fieldBase}
              placeholder="https://"
              aria-invalid={!!errors.socialUrl}
              {...register("socialUrl")}
            />
          </Field>

          <Field
            id="skills"
            label="Skills / areas you're interested in"
            error={errors.skills?.message}
          >
            <input
              id="skills"
              type="text"
              className={fieldBase}
              placeholder="Photography, editing, copywriting…"
              aria-invalid={!!errors.skills}
              {...register("skills")}
            />
          </Field>

          <Field
            id="availability"
            label="Availability"
            error={errors.availability?.message}
          >
            <input
              id="availability"
              type="text"
              className={fieldBase}
              placeholder="Dates you're free"
              aria-invalid={!!errors.availability}
              {...register("availability")}
            />
          </Field>
        </div>

        {state === "error" && serverError && (
          <div
            role="alert"
            className="mt-8 border border-crew-orange/60 bg-crew-orange/10 px-5 py-4 text-sm text-paper"
          >
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group mt-8 inline-flex w-full items-center justify-center gap-2 bg-crew-orange px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60 xs:mt-12 xs:px-8 xs:py-6 xs:text-sm sm:w-auto sm:px-14"
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
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-[11px] font-meta text-paper/60"
      >
        {label}
        {required && <span className="ml-1 text-crew-orange">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-crew-orange">
          {error}
        </p>
      )}
    </div>
  );
}
