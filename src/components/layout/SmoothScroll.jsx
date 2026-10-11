import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../../animations/gsapConfig";
import { setLenis } from "../../animations/smoothScroll";
import useReducedMotion from "../../hooks/useReducedMotion";

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Skipped entirely for reduced-motion users (they get native scrolling).
 */
export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return children;
}
