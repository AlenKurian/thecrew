"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { included } from "@/lib/utils";
import BenefitIcon from "./BenefitIcon";

const benefitImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
];

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefits-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".benefit-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper px-4 py-16 text-ink xs:px-6 xs:py-24 sm:px-10 sm:py-32"
    >
      <h2 className="benefits-heading mb-10 font-display text-[10vw] uppercase leading-[0.95] xs:mb-14 xs:text-[11vw] sm:mb-16 sm:text-[6vw]">
        We&rsquo;ve Got
        <br />
        You
      </h2>

      <ul className="flex flex-col gap-4 xs:gap-5">
        {included.map((item, i) => (
          <li
            key={item.title}
            className="benefit-item relative flex min-h-[96px] items-center overflow-hidden rounded-[2rem] border border-ink/10 bg-paper xs:min-h-[130px] xs:rounded-[2.5rem] sm:min-h-[150px]"
          >
            <span className="relative z-10 mx-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink/5 xs:mx-6 xs:h-20 xs:w-20 sm:mx-8 sm:h-24 sm:w-24">
              <BenefitIcon
                name={item.icon}
                className="h-5 w-5 text-ink xs:h-8 xs:w-8 sm:h-10 sm:w-10"
              />
            </span>
            <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-1 pr-20 xs:pr-40 sm:pr-56">
              <span className="font-display text-lg uppercase leading-tight xs:text-[4.5vw] sm:text-[2.2vw]">
                {item.title}
              </span>
              <span className="text-xs text-ink/60 xs:text-sm">
                {item.description}
              </span>
            </div>
            <div
              className="absolute inset-y-0 right-0 w-20 xs:w-32 sm:w-48"
              style={{
                clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0% 100%)",
              }}
            >
              <Image
                src={benefitImages[i]}
                alt=""
                fill
                sizes="(min-width: 640px) 12rem, 5rem"
                className="object-cover grayscale"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
