import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { applicationSchema, toApplicationRecord } from "@/lib/validation";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * POST /api/applications
 *
 * 1. Validates the request body with Zod (server-side — never trust the client).
 * 2. Checks for a duplicate email.
 * 3. Inserts the application into Supabase.
 * 4. (Optional / stubbed) sends confirmation + notification email via Resend.
 * 5. Returns a safe, minimal success response.
 */
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = (parsed.error as ZodError).flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Validation failed.", fieldErrors },
      { status: 422 }
    );
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("Supabase not configured:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "The application system isn't fully configured yet. Please try again shortly.",
      },
      { status: 503 }
    );
  }

  // Guard against duplicate applications from the same email.
  const { data: existing, error: lookupError } = await supabase
    .from("applications")
    .select("id")
    .eq("email", parsed.data.email.toLowerCase())
    .maybeSingle();

  if (lookupError) {
    console.error("Supabase lookup error:", lookupError);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  if (existing) {
    return NextResponse.json(
      {
        ok: false,
        error: "An application with this email has already been submitted.",
      },
      { status: 409 }
    );
  }

  const record = toApplicationRecord(parsed.data);

  const { data: inserted, error: insertError } = await supabase
    .from("applications")
    .insert(record)
    .select("id")
    .single();

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // --- Optional email hooks -------------------------------------------
  // Wire up Resend here once RESEND_API_KEY is set. Kept fire-and-forget
  // and best-effort so email delivery never blocks or fails the
  // application submission itself.
  //
  // if (process.env.RESEND_API_KEY) {
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //
  //   await resend.emails.send({
  //     from: process.env.RESEND_FROM_EMAIL ?? "crew@studiowytes.com",
  //     to: parsed.data.email,
  //     subject: "You're on the list — STUDIO WYTES™ THE CREW",
  //     html: `<p>Hey ${parsed.data.fullName}, your application to THE CREW has been received.</p>`,
  //   }).catch((err) => console.error("Resend confirmation email failed:", err));
  //
  //   if (process.env.STUDIO_WYTES_NOTIFY_EMAIL) {
  //     await resend.emails.send({
  //       from: process.env.RESEND_FROM_EMAIL ?? "crew@studiowytes.com",
  //       to: process.env.STUDIO_WYTES_NOTIFY_EMAIL,
  //       subject: `New CREW application: ${parsed.data.fullName}`,
  //       html: `<p>${parsed.data.fullName} (${parsed.data.email}) just applied.</p>`,
  //     }).catch((err) => console.error("Resend notify email failed:", err));
  //   }
  // }

  return NextResponse.json({ ok: true, id: inserted?.id }, { status: 201 });
}
