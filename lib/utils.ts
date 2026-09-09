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
  "Event Professionals",
  "Young Professionals",
  "Entrepreneurs",
];

export const disciplines = [
  {
    number: "01",
    title: "Creative",
    description: "Ideas, concepts, visual thinking & storytelling.",
    image: "/images/creative.png",
  },
  {
    number: "02",
    title: "Production",
    description: "Planning, coordination, execution & behind-the-scenes.",
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1400&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Events",
    description: "Live experiences, timelines, people & moving parts.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1400&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Media",
    description: "Photography, videography, content & digital storytelling.",
    image: "/images/medi.png",
  },
  {
    number: "05",
    title: "Marketing",
    description: "Brand communication, audience thinking & campaigns.",
    image: "/images/market.png",
  },
  {
    number: "06",
    title: "Operations",
    description: "Systems, coordination & precision behind the scene.",
    image: "/images/operatio.png",
  },
];

export const included = [
  {
    number: "01",
    title: "7-Day Stay",
    description: "Accommodation provided throughout the entire program.",
    icon: "stay",
  },
  {
    number: "02",
    title: "Food Provided",
    description: "Your essentials are covered so you focus on creating.",
    icon: "food",
  },
  {
    number: "03",
    title: "Hands-On",
    description: "Learn by participating in active, real event production.",
    icon: "hands-on",
  },
  {
    number: "04",
    title: "Networking",
    description: "Connect across creative, business, media & startup sectors.",
    icon: "networking",
  },
  {
    number: "05",
    title: "Team Access",
    description: "Get close access to the core team behind the projects.",
    icon: "team-access",
  },
  {
    number: "06",
    title: "Certificate",
    description: "Official recognition for participation & contribution.",
    icon: "certificate",
  },
] as const;

export const whatYouTakeWithYou = [
  {
    label: "Experience",
    description: "Real exposure to creative production and execution.",
  },
  {
    label: "Perspective",
    description: "A deeper understanding of multidisciplinary work.",
  },
  {
    label: "Connections",
    description:
      "Relationships with ambitious people across creative and business communities.",
  },
  {
    label: "Confidence",
    description: "The ability to communicate, collaborate, contribute, and execute.",
  },
  {
    label: "The Wytes Standard™",
    description: "A stronger understanding of what professional creative work demands.",
  },
  {
    label: "Recognition",
    description: "Official recognition of your participation and contribution.",
  },
];

export const whoItsForDetails = [
  {
    label: "Students",
    description: "Move beyond the classroom and into real-world creative environments.",
  },
  {
    label: "Creators",
    description: "Turn imagination into meaningful execution.",
  },
  {
    label: "Storytellers",
    description: "Build narratives that connect, move, and endure.",
  },
  {
    label: "Marketers",
    description: "Understand brands beyond campaigns.",
  },
  {
    label: "Event Professionals",
    description: "Experience the precision behind memorable moments.",
  },
  {
    label: "Young Professionals",
    description:
      "Expand your perspective, capabilities, and professional network.",
  },
  {
    label: "Entrepreneurs",
    description:
      "Understand how ideas, teams, brands, and experiences come together.",
  },
];
