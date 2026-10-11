import { useRef } from "react";
import { useGSAP } from "../animations/gsapConfig";
import { revealOnScroll } from "../animations/animationHelpers";
import useReducedMotion from "../hooks/useReducedMotion";
import { experience } from "../data/experience";
import SectionHeading from "../components/common/SectionHeading";

export default function Experience() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useGSAP(() => { if (!reduced) revealOnScroll("[data-reveal]", { y: 36 }); }, { scope: root, dependencies: [reduced] });

  return (
    <section id="experience" ref={root} className="section border-t border-line">
      <div className="container-x">
        <SectionHeading title="Experience" className="mb-12" />
        <div className="border-t border-line">
          {experience.map((e) => (
            <article key={e.title} data-reveal className="grid gap-3 border-b border-line py-8 transition-[padding] duration-500 hover:pl-3 md:grid-cols-[0.5fr_1.5fr] md:gap-8">
              <time className="text-mute">{e.when}</time>
              <div>
                <h3 className="display mb-2 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]">{e.title}</h3>
                <p className="m-0 text-lime">{e.org}</p>
                {e.text && <p className="mb-0 mt-3 max-w-2xl text-mute">{e.text}</p>}
                {e.bullets && (
                  <ul className="mb-0 mt-4 max-w-3xl list-disc space-y-2 pl-5 text-mute marker:text-lime">
                    {e.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
