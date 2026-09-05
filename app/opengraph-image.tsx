import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#FF571F",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Studio Wytes™ — The Crew
        </div>
        <div
          style={{
            color: "#f3ede4",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.05,
            marginTop: 24,
            textTransform: "uppercase",
            letterSpacing: -2,
          }}
        >
          7 Days. One Experience.
        </div>
        <div
          style={{
            color: "#f3ede4",
            fontSize: 28,
            marginTop: 32,
            opacity: 0.7,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Calicut • Kerala
        </div>
      </div>
    ),
    { ...size }
  );
}
