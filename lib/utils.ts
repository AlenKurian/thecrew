import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Content-only data kept out of components so copy is easy to update. */
export const audience = [
  "Students",
  "Creators",
  "Event Professionals",
  "Young Professionals",
  "Entrepreneurs",
  "Future Producers",
];

export const wytesStandardPrinciples = [
  "Think beyond the event.",
  "Understand the production.",
  "Own the details.",
  "Build the experience.",
];

export const stepInsideTheBuild = [
  {
    number: "01",
    title: "Event Concept",
    description: "Ideas, formats, themes, experience design, and event direction.",
    image: "/images/creative.png",
  },
  {
    number: "02",
    title: "Production",
    description:
      "Planning, timelines, logistics, technical coordination, vendors, and execution.",
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1400&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Event Operations",
    description:
      "Guest movement, backstage coordination, show flow, schedules, and live problem-solving.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Experience Building",
    description:
      "Spaces, environments, moments, interactions, and the details that transform an event into an experience.",
    image: "/images/medi.png",
  },
  {
    number: "05",
    title: "On-Ground Execution",
    description: "Real teams. Real pressure. Real deadlines. Real responsibility.",
    image: "/images/operatio.png",
  },
];

export const proximityChangesEverything = [
  "The planning behind the event.",
  "The production behind the experience.",
  "The systems behind the execution.",
  "The people behind the outcome.",
];

export const whoItsForDetails = [
  {
    label: "Students",
    description: "Step beyond theory and experience real production environments.",
  },
  {
    label: "Creators",
    description: "Turn ideas into physical experiences.",
  },
  {
    label: "Event Professionals",
    description: "Sharpen your production and execution mindset.",
  },
  {
    label: "Young Professionals",
    description: "Build practical experience and connections.",
  },
  {
    label: "Entrepreneurs",
    description: "Understand how experiences are designed and delivered.",
  },
  {
    label: "Future Producers",
    description: "Get closer to the work that makes events happen.",
  },
];

export const crewTraits = [
  "Curious",
  "Responsible",
  "Hands-On",
  "Detail-Driven",
  "Collaborative",
  "Ready to Contribute",
];
