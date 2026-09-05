import { z } from "zod";

/**
 * Shared validation schema for THE CREW application form.
 * Used on both the client (React Hook Form + zodResolver) and the
 * server (app/api/applications/route.ts) so the rules can never drift.
 */

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Enter a valid URL (include https://)" }
  );

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name (min. 2 characters)")
    .max(120, "That name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(20, "That phone number is too long"),
  city: z
    .string()
    .trim()
    .min(2, "Tell us which city you're in")
    .max(80, "That city name is too long"),
  role: z
    .string()
    .trim()
    .min(2, "Tell us what you do")
    .max(120, "Keep it under 120 characters"),
  whyJoin: z
    .string()
    .trim()
    .min(40, "Give us at least 40 characters — we want to know you")
    .max(1200, "Keep it under 1200 characters"),
  portfolioUrl: optionalUrl,
  socialUrl: optionalUrl,
  skills: z.string().trim().max(300, "Keep it under 300 characters").optional(),
  availability: z
    .string()
    .trim()
    .max(200, "Keep it under 200 characters")
    .optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/** Maps camelCase form fields to the snake_case columns in Supabase. */
export function toApplicationRecord(input: ApplicationInput) {
  return {
    full_name: input.fullName,
    email: input.email.toLowerCase(),
    phone: input.phone,
    city: input.city,
    role: input.role,
    portfolio_url: input.portfolioUrl || null,
    social_url: input.socialUrl || null,
    why_join: input.whyJoin,
    skills: input.skills || null,
    availability: input.availability || null,
    status: "pending" as const,
  };
}
