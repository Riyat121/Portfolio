import { useRef, useState, useEffect } from "react";
import { useGSAP, gsap } from "../animations/gsapConfig";
import useReducedMotion from "../hooks/useReducedMotion";
import { personalInfo } from "../data/personalInfo";
import Button from "../components/common/Button";
import ScrollIndicator from "../components/ui/ScrollIndicator";
import { scrollToTarget } from "../animations/smoothScroll";

function RoleTicker({ roles, ready, reduced }) {
  const inner = useRef(null);
  const list = [...roles, roles[0]];
  const step = 100 / list.length;

  useGSAP(
    () => {
      if (!ready || reduced) return;
      const tl = gsap.timeline({ repeat: -1, delay: 1.2 });
      roles.forEach((_, i) => {
        tl.to(inner.current, { yPercent: -(i + 1) * step, duration: 0.8, ease: "power4.inOut" }, i === 0 ? 0 : "+=1.6");
      });
      tl.set(inner.current, { yPercent: 0 }, "+=1.6");
    },
    { scope: inner, dependencies: [ready, reduced] }
  );

  return (
    <span className="block h-[1.15em] overflow-hidden text-lime" aria-hidden="true">
      <span ref={inner} className="block will-change-transform">
        {list.map((r, i) => (
          <span key={i} className="block h-[1.15em]">{r}</span>
        ))}
      </span>
    </span>
  );
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: personalInfo.timeZone }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (!ready || reduced) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero-line]", { yPercent: 105, duration: 1.3, stagger: 0.14 })
        .from("[data-hero-bar]", { scaleX: 0, duration: 1.2, ease: "power3.inOut" }, "-=0.9")
        .from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 }, "-=0.8");
      gsap.to("[data-hero-name]", {
        xPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [ready, reduced] }
  );

  const lineCls = "block overflow-hidden pb-[0.06em]";

  return (
    <section id="hero" ref={root} className="flex min-h-svh flex-col justify-end pb-10 pt-28">
      <div className="container-x">
        <p data-hero-fade className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-mute">
          <span className="inline-flex items-center gap-2">
            <i className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
            {personalInfo.status}
          </span>
          <span className="tabular-nums" aria-hidden="true">{personalInfo.location} {time}</span>
        </p>

        <h1
          data-hero-name
          className="display whitespace-nowrap text-[clamp(5.4rem,27vw,25rem)] leading-[0.8]"
          style={{ marginLeft: "-0.03em" }}
        >
          <span className="sr-only">{personalInfo.name}</span>
          <span aria-hidden="true" className={lineCls}>
            <span data-hero-line className="block">{personalInfo.firstName}</span>
          </span>
          <span aria-hidden="true" className={`${lineCls} outline-text`}>
            <span data-hero-line className="block">{personalInfo.lastName}</span>
          </span>
        </h1>

        <div data-hero-bar className="my-7 h-[3px] origin-left bg-lime" aria-hidden="true" />

        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
          <div data-hero-fade className="font-display text-[clamp(1.6rem,3vw,2.4rem)] uppercase leading-[1.1]">
            <span className="sr-only">{personalInfo.roles.join(", ")}. </span>
            <RoleTicker roles={personalInfo.roles} ready={ready} reduced={reduced} />
          </div>
          <p data-hero-fade className="m-0 max-w-md text-lg text-mute">{personalInfo.intro}</p>
          <div data-hero-fade className="flex flex-wrap gap-3">
            <Button href="#work" variant="lime" onClick={(e) => { e.preventDefault(); scrollToTarget("#work"); }}>
              Explore my work
            </Button>
            <Button href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget("#contact"); }}>
              Let&apos;s connect
            </Button>
          </div>
        </div>

        <ScrollIndicator data-hero-fade className="mt-10" />
      </div>
    </section>
  );
}
