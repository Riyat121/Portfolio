import { useRef } from "react";
import { useGSAP, gsap } from "../../animations/gsapConfig";
import useReducedMotion from "../../hooks/useReducedMotion";

/**
 * Masked word-by-word reveal. The real text stays in the DOM for screen readers
 * (sr-only copy); the animated words are aria-hidden.
 * - scroll: play when the element enters the viewport (once)
 * - active: set false to hold the animation until something is ready (e.g. the loader)
 */
export default function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
  scroll = false,
  active = true,
  stagger = 0.08,
  delay = 0,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      if (reduced || !active) return;
      const vars = { yPercent: 110, duration: 1, stagger, delay, ease: "power4.out" };
      if (scroll) vars.scrollTrigger = { trigger: ref.current, start: "top 90%", once: true };
      gsap.from(ref.current.querySelectorAll("[data-word]"), vars);
    },
    { scope: ref, dependencies: [active, reduced] }
  );

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            {i > 0 && " "}
            <span className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]">
              <span data-word className="inline-block">{word}</span>
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
