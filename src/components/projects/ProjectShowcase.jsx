import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP, gsap } from "../../animations/gsapConfig";
import useReducedMotion from "../../hooks/useReducedMotion";
import { personalInfo } from "../../data/personalInfo";
import ProjectCard from "./ProjectCard";

/**
 * Horizontal strip of project panels. Native scroll + snap (no pinning, no scroll hijack),
 * mouse drag on desktop, and prev/next buttons for keyboard users.
 */
export default function ProjectShowcase({ projects }) {
  const wrap = useRef(null);
  const strip = useRef(null);
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-panel]", {
        x: 140,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: strip.current, start: "top 85%", once: true },
      });
    },
    { scope: wrap, dependencies: [reduced] }
  );

  const nudge = (dir) =>
    strip.current.scrollBy({ left: dir * strip.current.clientWidth * 0.7, behavior: reduced ? "auto" : "smooth" });

  const onDown = (e) => {
    if (e.pointerType !== "mouse" || e.target.closest("a")) return;
    const s = strip.current;
    drag.current = { down: true, moved: false, x: e.clientX, left: s.scrollLeft };
    s.classList.remove("snap-x");
    s.classList.add("cursor-grabbing");
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    strip.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    strip.current.classList.add("snap-x");
    strip.current.classList.remove("cursor-grabbing");
  };

  return (
    <div ref={wrap}>
      <div
        ref={strip}
        tabIndex={0}
        role="region"
        aria-label="Projects, scroll sideways"
        className="h-scroll snap-x snap-mandatory flex cursor-grab select-none gap-5 overflow-x-auto pb-4"
        style={{ paddingInline: "var(--gutter)", scrollPaddingInline: "var(--gutter)" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
        {personalInfo.github && (
          <a
            data-panel
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-[min(78vh,560px)] w-[min(70vw,380px)] shrink-0 snap-start flex-col justify-end border border-line p-8 no-underline transition-colors hover:border-lime hover:bg-lime hover:text-bg"
          >
            <span className="display text-[clamp(2.4rem,5vw,3.6rem)]">More on GitHub</span>
            <span className="mt-2 text-mute group-hover:text-bg">More projects and experiments.</span>
          </a>
        )}
      </div>

      <div className="container-x mt-4 flex items-center justify-between text-sm text-mute">
        <span>Drag, swipe or use the arrows.</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous projects" className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-transparent text-ink transition-colors hover:border-lime hover:text-lime">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next projects" className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-transparent text-ink transition-colors hover:border-lime hover:text-lime">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
