import { useRef } from "react";
import { useGSAP, gsap } from "../animations/gsapConfig";
import useReducedMotion from "../hooks/useReducedMotion";
import { personalInfo } from "../data/personalInfo";
import Button from "../components/common/Button";

const line = "block overflow-hidden pb-[0.08em]";

export default function Contact() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const { email, linkedin, github, resume } = personalInfo;

  useGSAP(
    () => {
      if (reduced) return;
      const st = { trigger: root.current, start: "top 65%", once: true };
      gsap.from("[data-cta-line]", { yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power4.out", scrollTrigger: st });
      gsap.from("[data-cta-link]", { autoAlpha: 0, y: 24, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { ...st, start: "top 55%" } });
    },
    { scope: root, dependencies: [reduced] }
  );

  const noLinks = !email && !linkedin && !github && !resume;

  return (
    <section id="contact" ref={root} className="section border-t border-line pb-10">
      <div className="container-x">
        <h2 className="display m-0 mb-12 text-[clamp(3.4rem,12vw,11rem)] leading-[0.86]">
          <span className="sr-only">Have a good idea? Let&apos;s build it.</span>
          <span aria-hidden="true" className={line}><span data-cta-line className="block">Have a good idea?</span></span>
          <span aria-hidden="true" className={`${line} text-lime`}><span data-cta-line className="block">Let&apos;s build it.</span></span>
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          {email && <Button data-cta-link href={`mailto:${email}`} variant="lime" icon>{email}</Button>}
          {linkedin && <Button data-cta-link href={linkedin} icon>LinkedIn</Button>}
          {github && <Button data-cta-link href={github} icon>GitHub</Button>}
          {resume && <Button data-cta-link href={resume} download>Download résumé</Button>}
        </div>
        {noLinks && <p className="mt-6 text-mute">Add your email and profile links in src/data/personalInfo.js.</p>}
      </div>
    </section>
  );
}
