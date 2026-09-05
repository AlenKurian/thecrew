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
    description: "Ideas, concepts, visual thinking & storytelling.",
    image: "/images/discipline-creative.jpg",
  },
  {
    number: "02",
    title: "Production",
    description: "Planning, coordination, execution & behind-the-scenes.",
    image: "/images/discipline-production.jpg",
  },
  {
    number: "03",
    title: "Events",
    description: "Live experiences, timelines, people & moving parts.",
    image: "/images/discipline-events.jpg",
  },
  {
    number: "04",
    title: "Media",
    description: "Photography, videography, content & digital storytelling.",
    image: "/images/discipline-media.jpg",
  },
  {
    number: "05",
    title: "Marketing",
    description: "Brand communication, audience thinking & campaigns.",
    image: "/images/discipline-marketing.jpg",
  },
  {
    number: "06",
    title: "Operations",
    description: "Systems, coordination & precision behind the scene.",
    image: "/images/discipline-operations.jpg",
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

export const whoItsForDetails = [
  { label: "Students", description: "Ready to step beyond the classroom." },
  { label: "Creators", description: "Turning raw ideas into reality." },
  { label: "Marketers", description: "Understanding brand experiences." },
  { label: "Storytellers", description: "Thinking in visuals & narratives." },
  {
    label: "Event Enthusiasts",
    description: "Experiencing live execution.",
  },
  { label: "Entrepreneurs", description: "Learning fast in action." },
];
