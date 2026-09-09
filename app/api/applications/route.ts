import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import nodemailer from "nodemailer";
import { applicationSchema, type ApplicationInput } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * POST /api/applications
 *
 * No database. Validates the submission server-side, then sends two
 * emails over SMTP: the full application to the studio inbox, and a
 * branded confirmation to the applicant. If mail isn't configured the
 * request fails loudly so a submission is never silently lost.
 *
 * Env (see .env.local.example) — generic SMTP, works with Zoho, Gmail,
 * Outlook, or any provider:
 *   SMTP_HOST   e.g. smtp.zoho.com  (smtp.zoho.in / smtp.zoho.eu by region)
 *   SMTP_PORT   465 (SSL) or 587 (STARTTLS). Defaults to 465.
 *   SMTP_USER   the full mailbox address that authenticates & sends
 *   SMTP_PASS   that mailbox's password, or an app-specific password if 2FA is on
 *   MAIL_FROM   optional — the From address. Defaults to SMTP_USER.
 *   STUDIO_WYTES_NOTIFY_EMAIL  where applications land. Defaults to SMTP_USER.
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

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 465;
  const from = process.env.MAIL_FROM || user;
  const notify = process.env.STUDIO_WYTES_NOTIFY_EMAIL || user;

  if (!host || !user || !pass) {
    console.error(
      "Mail not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "The application system isn't fully configured yet. Please try again shortly.",
      },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587 (STARTTLS)
    auth: { user, pass },
  });

  const data = parsed.data;
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    await transporter.sendMail({
      from: `"THE CREW — Applications" <${from}>`,
      to: notify,
      replyTo: `"${data.fullName}" <${data.email}>`,
      subject: `New CREW application — ${data.fullName}`,
      text: toPlainText(data, submittedAt),
      html: renderStudioEmail(data, submittedAt),
    });
  } catch (err) {
    console.error("SMTP send error:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your application. Please try again." },
      { status: 502 }
    );
  }

  // Best-effort confirmation to the applicant — never fail the request on this.
  try {
    await transporter.sendMail({
      from: `"STUDIO WYTES™ — THE CREW" <${from}>`,
      to: data.email,
      subject: "Application received — STUDIO WYTES™ THE CREW",
      text: confirmationPlainText(data),
      html: renderApplicantEmail(data),
    });
  } catch (err) {
    console.error("Confirmation email failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/* ------------------------------------------------------------------ */
/* Field config                                                       */
/* ------------------------------------------------------------------ */

const LABELS: Record<keyof ApplicationInput, string> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  city: "City / Country",
  role: "Role / Profession",
  whyJoin: "What drives them to create",
  portfolioUrl: "LinkedIn / Portfolio",
  skills: "Area of interest",
};

const PRIMARY: (keyof ApplicationInput)[] = [
  "fullName",
  "email",
  "phone",
  "city",
  "role",
  "whyJoin",
];

const OPTIONAL: (keyof ApplicationInput)[] = ["portfolioUrl", "skills"];

const ORDER = [...PRIMARY, ...OPTIONAL];

/* ------------------------------------------------------------------ */
/* Plain-text fallbacks                                               */
/* ------------------------------------------------------------------ */

function toPlainText(data: ApplicationInput, submittedAt: string): string {
  const lines = ORDER.map((key) => {
    const value = data[key];
    return `${LABELS[key].toUpperCase()}\n${
      value && String(value).trim() ? value : "—"
    }`;
  });
  return [
    "STUDIO WYTES™ — THE CREW",
    "NEW APPLICATION",
    `Submitted ${submittedAt} IST`,
    "",
    ...lines,
    "",
    `Reply to this email to reach ${data.fullName} directly.`,
  ].join("\n\n");
}

function confirmationPlainText(data: ApplicationInput): string {
  return [
    "STUDIO WYTES™ — THE CREW",
    "",
    `Hi ${data.fullName},`,
    "",
    "Your application to THE CREW has been received. We'll be in touch.",
    "",
    "7 Days. One Experience. Calicut, Kerala.",
    "",
    "— STUDIO WYTES™",
  ].join("\n");
}

/* ------------------------------------------------------------------ */
/* HTML email — monochrome, table layout, inline styles               */
/* ------------------------------------------------------------------ */

const BLACK = "#000000";
const WHITE = "#ffffff";
const GREY = "#6b6b6b"; // secondary text / labels
const FAINT = "#a6a6a6"; // placeholder dashes
const RULE = "#e4e4e4"; // hairline on white

const MONO =
  "'SFMono-Regular', ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

function shell(inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background:${WHITE};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WHITE};">
    <tr>
      <td align="center" style="padding:56px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:560px;background:${WHITE};border:1px solid ${RULE};">
          ${inner}
        </table>
        <div style="font-family:${MONO};font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:${FAINT};padding:24px 0 0;">
          Studio Wytes&trade; &nbsp;&mdash;&nbsp; The Crew
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function header(kicker: string, title: string, sub?: string): string {
  return `
  <tr>
    <td style="background:${BLACK};padding:52px 44px 48px;">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:0.34em;text-transform:uppercase;color:${WHITE};opacity:0.55;">
        ${esc(kicker)}
      </div>
      <div style="font-family:${SANS};font-weight:800;font-size:34px;line-height:1.02;letter-spacing:-0.03em;text-transform:uppercase;color:${WHITE};padding-top:18px;">
        ${esc(title)}
      </div>
      ${
        sub
          ? `<div style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${WHITE};opacity:0.4;padding-top:20px;">${esc(
              sub
            )}</div>`
          : ""
      }
    </td>
  </tr>`;
}

function fieldRow(
  key: keyof ApplicationInput,
  data: ApplicationInput,
  last: boolean
): string {
  const raw = data[key];
  const has = raw != null && String(raw).trim() !== "";
  const str = has ? String(raw) : "";
  let valueHtml: string;

  if (!has) {
    valueHtml = `<span style="color:${FAINT};">&mdash;</span>`;
  } else if (isUrl(str)) {
    valueHtml = `<a href="${esc(str)}" style="color:${BLACK};text-decoration:none;border-bottom:1px solid ${BLACK};word-break:break-all;">${esc(
      str
    )}</a>`;
  } else if (key === "email") {
    valueHtml = `<a href="mailto:${esc(str)}" style="color:${BLACK};text-decoration:none;border-bottom:1px solid ${BLACK};">${esc(
      str
    )}</a>`;
  } else {
    valueHtml = esc(str).replace(/\n/g, "<br />");
  }

  return `
  <tr>
    <td style="padding:20px 44px;${
      last ? "" : `border-bottom:1px solid ${RULE};`
    }">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:${GREY};padding-bottom:8px;">
        ${esc(LABELS[key])}
      </div>
      <div style="font-family:${SANS};font-size:15px;line-height:1.55;color:${BLACK};">
        ${valueHtml}
      </div>
    </td>
  </tr>`;
}

function sectionLabel(text: string): string {
  return `
  <tr>
    <td style="padding:34px 44px 4px;">
      <div style="font-family:${MONO};font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:${BLACK};">
        ${esc(text)}
      </div>
      <div style="height:1px;background:${BLACK};margin-top:12px;font-size:0;line-height:0;">&nbsp;</div>
    </td>
  </tr>`;
}

function rows(keys: (keyof ApplicationInput)[], data: ApplicationInput): string {
  return keys
    .map((k, i) => fieldRow(k, data, i === keys.length - 1))
    .join("");
}

/** Internal email to the studio — the full application. */
function renderStudioEmail(data: ApplicationInput, submittedAt: string): string {
  const inner = `
  ${header("New Application", "Get in the Room.", `Submitted ${submittedAt} IST`)}
  ${sectionLabel("Applicant")}
  ${rows(PRIMARY, data)}
  ${sectionLabel("Optional")}
  ${rows(OPTIONAL, data)}
  <tr>
    <td style="padding:36px 44px 44px;border-top:1px solid ${RULE};">
      <a href="mailto:${esc(data.email)}"
         style="display:inline-block;font-family:${MONO};font-size:10px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:${WHITE};background:${BLACK};padding:16px 32px;text-decoration:none;">
        Reply to ${esc(data.fullName)} &nbsp;&rarr;
      </a>
    </td>
  </tr>`;

  return shell(inner);
}

/** Confirmation email to the applicant. */
function renderApplicantEmail(data: ApplicationInput): string {
  const inner = `
  ${header("Application Received", "You're on the List.")}
  <tr>
    <td style="padding:44px 44px 8px;">
      <div style="font-family:${SANS};font-size:15px;line-height:1.7;color:${BLACK};">
        Hi ${esc(data.fullName)},
      </div>
      <div style="font-family:${SANS};font-size:15px;line-height:1.7;color:${BLACK};padding-top:18px;">
        Your application to <strong style="font-weight:700;">THE CREW</strong>
        has been received. We&rsquo;ll be in touch.
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 44px;">
      <div style="border-top:1px solid ${RULE};border-bottom:1px solid ${RULE};padding:28px 0;">
        <div style="font-family:${MONO};font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:${GREY};padding-bottom:12px;">
          The Experience
        </div>
        <div style="font-family:${SANS};font-weight:800;font-size:24px;line-height:1.05;letter-spacing:-0.02em;text-transform:uppercase;color:${BLACK};">
          7 Days. One Experience.
        </div>
        <div style="font-family:${MONO};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${GREY};padding-top:14px;">
          Calicut &nbsp;&bull;&nbsp; Kerala
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding:4px 44px 48px;">
      <div style="font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${GREY};">
        &mdash;&nbsp; Studio Wytes&trade;
      </div>
    </td>
  </tr>`;

  return shell(inner);
}
