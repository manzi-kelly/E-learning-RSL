import { useEffect, useState } from "react";
import { navigation, type LandingSection } from "../navigation";

export default function useActiveSection(isLanding: boolean) {
  const [active, setActive] = useState<LandingSection>("home");

  useEffect(() => {
    if (!isLanding) return;

    const targets = navigation.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    let observer: IntersectionObserver | undefined;

    const update = () => {
      const readingLine = Math.round(window.innerHeight * 0.36);
      const visible = targets.filter(({ element }) => {
        const { top, bottom } = element.getBoundingClientRect();
        return top <= readingLine && bottom >= readingLine;
      });

      if (visible.length) setActive(visible[visible.length - 1].id);
    };

    const syncHash = () => {
      const fragment = targets.find(({ id }) => window.location.hash === `#${id}`)?.id;
      if (fragment) setActive(fragment);
      else update();
    };

    const observe = () => {
      observer?.disconnect();
      if (!("IntersectionObserver" in window)) return;

      // Watch a thin viewport band below the sticky header.
      const line = Math.round(window.innerHeight * 0.36);
      observer = new IntersectionObserver(update, {
        rootMargin: `-${line}px 0px -${window.innerHeight - line - 1}px 0px`,
      });
      for (const { element } of targets) observer.observe(element);
    };

    syncHash();
    observe();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("resize", observe);
    };
  }, [isLanding]);

  return isLanding ? active : undefined;
}
