import { useRef } from "react";
import { useGSAP } from "../animations/gsapConfig";
import { revealOnScroll } from "../animations/animationHelpers";
import useReducedMotion from "../hooks/useReducedMotion";
import { approach } from "../data/approach";
import SectionHeading from "../components/common/SectionHeading";

export default function Approach() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useGSAP(() => { if (!reduced) revealOnScroll("[data-reveal]", { y: 30 }); }, { scope: root, dependencies: [reduced] });

  return (
    <section id="approach" ref={root} className="section border-t border-line">
      <div className="container-x">
        <SectionHeading title="How I work" className="mb-12" />
        <ol className="m-0 border-t border-line p-0" style={{ listStyle: "none" }}>
          {approach.map((step, i) => (
            <li key={step.title} data-reveal className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-6 md:grid-cols-[6rem_1fr_1.2fr] md:items-baseline">
              <span className="font-display text-2xl text-lime tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <strong className="display text-[clamp(1.8rem,3.4vw,2.8rem)] font-normal leading-[1]">{step.title}</strong>
              <span className="col-start-2 text-mute md:col-start-3">{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
