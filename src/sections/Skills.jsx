import { useRef } from "react";
import { useGSAP } from "../animations/gsapConfig";
import { revealOnScroll } from "../animations/animationHelpers";
import useReducedMotion from "../hooks/useReducedMotion";
import { skills } from "../data/skills";
import SectionHeading from "../components/common/SectionHeading";

export default function Skills() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useGSAP(() => { if (!reduced) revealOnScroll("[data-reveal]", { y: 30 }); }, { scope: root, dependencies: [reduced] });

  return (
    <section id="skills" ref={root} className="section border-t border-line">
      <div className="container-x">
        <SectionHeading title="Skills" className="mb-12" />
        <div className="skill-list border-t border-line">
          {skills.map(({ group, items }) => (
            <div key={group} data-reveal className="skill-row grid gap-3 border-b border-line py-6 md:grid-cols-[0.5fr_1.5fr] md:gap-8">
              <h3 className="m-0 text-base font-medium text-mute">{group}</h3>
              <ul className="m-0 flex flex-wrap gap-x-3 gap-y-1 p-0 font-display text-[clamp(1.6rem,3vw,2.5rem)] uppercase leading-[1.15]" style={{ listStyle: "none" }}>
                {items.map((item, i) => (
                  <li key={item} className="skill-item">
                    {item}
                    {i < items.length - 1 && <span className="ml-3 text-line" aria-hidden="true">/</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
