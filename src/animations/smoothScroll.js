// Tiny bridge so any component can scroll to a section whether or not Lenis is running.
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export function scrollToTarget(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -64, duration: 1.3 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
}
