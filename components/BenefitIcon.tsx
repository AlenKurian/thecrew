import type { ReactElement, SVGProps } from "react";

const paths: Record<string, ReactElement> = {
  stay: (
    <path d="M3 10.5 12 4l9 6.5M5 9.5V20h14V9.5M9.5 20v-6h5v6" />
  ),
  food: (
    <path d="M7 3v6a2 2 0 0 0 2 2v10M7 3v8M9 3v8M17 3c-1.7 0-3 2-3 5s1.3 5 3 5v8" />
  ),
  "hands-on": (
    <path d="M9 12.5V6a1.5 1.5 0 0 1 3 0v5M12 11V4.5a1.5 1.5 0 0 1 3 0V11M15 11.5V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6.5 7-3 0-4.5-1.2-6-3l-2.7-4a1.4 1.4 0 0 1 2.2-1.7L7 13" />
  ),
  networking: (
    <path d="M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM7 9v2c0 1.5 1 2.5 2.5 3M17 9v2c0 1.5-1 2.5-2.5 3M12 17.5V20" />
  ),
  "team-access": (
    <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11c1.7 0 3-1.3 3-3s-1.3-3-3-3M15.5 14c2.3.4 4 1.9 4.5 4" />
  ),
  certificate: (
    <path d="M4 4h16v12H4zM9 16l-1.5 5 2.5-1.5L12 21l2-1.5 2.5 1.5L15 16M8 8h8M8 11h5" />
  ),
};

export default function BenefitIcon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const path = paths[name];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {path}
    </svg>
  );
}
