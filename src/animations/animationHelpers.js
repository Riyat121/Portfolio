import { gsap } from "./gsapConfig";

// Fade-and-rise for each element the first time it scrolls into view.
// Call inside useGSAP so every trigger is cleaned up with its scope.
export function revealOnScroll(targets, { y = 36, duration = 0.9, start = "top 90%" } = {}) {
  gsap.utils.toArray(targets).forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y,
      duration,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start, once: true },
    });
  });
}
