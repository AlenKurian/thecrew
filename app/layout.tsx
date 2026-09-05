import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://thecrew.studiowytes.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "STUDIO WYTES™ — THE CREW",
    template: "%s — STUDIO WYTES™ THE CREW",
  },
  description:
    "7 days. One experience. A room full of possibility. STUDIO WYTES™ is opening THE CREW — a limited, immersive 7-day experience in Calicut, Kerala. Apply to get in the room.",
  keywords: [
    "Studio Wytes",
    "The Crew",
    "Calicut internship",
    "Kerala creative internship",
    "event production experience",
    "creative studio experience",
  ],
  openGraph: {
    title: "STUDIO WYTES™ — THE CREW",
    description:
      "7 days. One experience. A room full of possibility. Apply for THE CREW — Calicut, Kerala.",
    url: siteUrl,
    siteName: "Studio Wytes — The Crew",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STUDIO WYTES™ — THE CREW",
    description: "7 days. One experience. A room full of possibility.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-ink text-paper antialiased">
        <div className="grain" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
