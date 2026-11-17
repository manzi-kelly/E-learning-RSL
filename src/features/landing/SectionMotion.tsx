"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function SectionMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", (_, contextSafe) => {
      const element = scope.current;
      if (!element || !("IntersectionObserver" in window)) return;

      const reveal = contextSafe?.(() => {
        gsap.from("[data-section-reveal]", {
          y: 8,
          opacity: 0.72,
          stagger: 0.045,
          duration: 0.32,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      });

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        reveal?.();
      }, { threshold: 0.15 });
      observer.observe(element);

      return () => observer.disconnect();
    });

    return () => motion.revert();
  }, { scope });

  return <div ref={scope}>{children}</div>;
}
