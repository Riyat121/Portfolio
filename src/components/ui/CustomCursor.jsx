import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsapConfig";

/** Small lime dot that grows over links and buttons. Only mounts on fine-pointer devices. */
export default function CustomCursor() {
  const dot = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current) return undefined;

    const el = dot.current;
    const x = gsap.quickTo(el, "x", { duration: 0.25, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.25, ease: "power3" });
    const move = (e) => {
      el.style.opacity = 1;
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e) => gsap.to(el, { scale: e.target.closest("a,button,[data-cursor]") ? 3.2 : 1, duration: 0.3 });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-white opacity-0 mix-blend-difference"
    />
  );
}
