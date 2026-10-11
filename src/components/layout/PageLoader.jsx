import { useRef, useState } from "react";
import { useGSAP, gsap } from "../../animations/gsapConfig";
import useReducedMotion from "../../hooks/useReducedMotion";
import { personalInfo } from "../../data/personalInfo";

/** Runs once on first load: counter, then the panel lifts away and the hero begins. */
export default function PageLoader({ onDone }) {
  const root = useRef(null);
  const countRef = useRef(null);
  const [gone, setGone] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const html = document.documentElement;
      const finish = () => {
        html.classList.remove("is-loading");
        setGone(true);
      };
      if (reduced) {
        finish();
        onDone();
        return undefined;
      }
      html.classList.add("is-loading");
      const n = { v: 0 };
      const tl = gsap.timeline();
      tl.to(n, {
        v: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = Math.round(n.v);
        },
      })
        .add(() => onDone(), "+=0.05")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut", onComplete: finish }, "<");
      return () => html.classList.remove("is-loading");
    },
    { scope: root, dependencies: [reduced] }
  );

  if (gone) return null;
  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-end justify-between bg-bg px-5 pb-6 sm:px-10"
    >
      <span className="display text-[clamp(2.6rem,9vw,7rem)]">{personalInfo.name}</span>
      <span className="display text-[clamp(2.6rem,9vw,7rem)] text-lime tabular-nums">
        <span ref={countRef}>0</span>
      </span>
    </div>
  );
}
