import { useRef } from "react";
import { useGSAP, gsap } from "../animations/gsapConfig";
import { revealOnScroll } from "../animations/animationHelpers";
import useReducedMotion from "../hooks/useReducedMotion";
import { personalInfo } from "../data/personalInfo";
import SectionHeading from "../components/common/SectionHeading";

function Stat({ value, suffix, label, reduced }) {
  const num = useRef(null);
  useGSAP(
    () => {
      if (reduced || value < 10) return; // tiny numbers just show, no count-up
      const o = { v: 0 };
      num.current.textContent = "0";
      gsap.to(o, {
        v: value,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => (num.current.textContent = Math.round(o.v)),
        scrollTrigger: { trigger: num.current, start: "top 92%", once: true },
      });
    },
    { scope: num, dependencies: [reduced] }
  );
  return (
    <div data-reveal className="border-t border-line pt-5">
      <strong className="display block text-[clamp(3rem,6vw,5rem)] text-lime tabular-nums">
        <span ref={num}>{value}</span>
        {suffix}
      </strong>
      <span className="text-mute">{label}</span>
    </div>
  );
}

export default function About() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const words = personalInfo.about.statement.split(" ");

  useGSAP(
    () => {
      if (reduced) return;
      // statement lights up word by word as you scroll through it (no pinning)
      gsap.fromTo(
        "[data-scrub]",
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: "[data-statement]", start: "top 82%", end: "bottom 50%", scrub: true },
        }
      );
      revealOnScroll("[data-reveal]");
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section id="about" ref={root} className="section border-t border-line">
      <div className="container-x">
        <SectionHeading title="About" className="mb-12" />
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <p data-statement className="display m-0 text-[clamp(2rem,4.6vw,4rem)] leading-[1.02]">
            {words.map((w, i) => (
              <span key={i} data-scrub className="inline-block">{w}{"\u00a0"}</span>
            ))}
          </p>
          <div className="space-y-4 text-mute">
            {personalInfo.about.paragraphs.map((p) => (
              <p key={p} data-reveal className="m-0">{p}</p>
            ))}
          </div>
        </div>
        {personalInfo.stats?.length > 0 && (
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {personalInfo.stats.map((s) => (
            <Stat key={s.label} {...s} reduced={reduced} />
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
