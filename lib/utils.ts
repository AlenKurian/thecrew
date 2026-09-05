import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Content-only data kept out of components so copy is easy to update. */
export const audience = [
  "Students",
  "Creators",
  "Marketers",
  "Storytellers",
  "Event Enthusiasts",
  "Young Professionals",
  "Entrepreneurs",
];

export const disciplines = [
  {
    number: "01",
    title: "Creative",
    image: "/images/discipline-creative.jpg",
  },
  {
    number: "02",
    title: "Production",
    image: "/images/discipline-production.jpg",
  },
  {
    number: "03",
    title: "Events",
    image: "/images/discipline-events.jpg",
  },
  {
    number: "04",
    title: "Media",
    image: "/images/discipline-media.jpg",
  },
  {
    number: "05",
    title: "Marketing",
    image: "/images/discipline-marketing.jpg",
  },
  {
    number: "06",
    title: "Operations",
    image: "/images/discipline-operations.jpg",
  },
  {
    number: "07",
    title: "Experience",
    image: "/images/discipline-experience.jpg",
  },
];

export const included = [
  { number: "01", title: "7-Day Stay" },
  { number: "02", title: "Food Provided" },
  { number: "03", title: "Hands-On Experience" },
  { number: "04", title: "Networking" },
  { number: "05", title: "Team Access" },
  { number: "06", title: "Certificate / Experience Recognition" },
];
