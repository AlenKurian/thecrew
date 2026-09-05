"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering a plugin twice is a safe no-op in GSAP, so every client
// component that needs ScrollTrigger can import this module directly
// instead of depending on registration order across components.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
