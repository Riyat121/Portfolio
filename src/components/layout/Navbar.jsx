import { useEffect, useState } from "react";
import { navigation } from "../../data/navigation";
import { personalInfo } from "../../data/personalInfo";
import { scrollToTarget, stopScroll, startScroll } from "../../animations/smoothScroll";

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navigation.map((n) => document.querySelector(n.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    stopScroll();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      startScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    // let Lenis restart before scrolling
    requestAnimationFrame(() => scrollToTarget(href));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-[translate,opacity] duration-700 ${ready ? "" : "-translate-y-full opacity-0"}`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* blur lives on its own layer: backdrop-filter on the header would trap the fixed mobile menu */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-bg/85 backdrop-blur-md transition-opacity duration-300 ${scrolled || open ? "opacity-100" : "opacity-0"}`}
      />
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">
        <a href="#hero" onClick={(e) => go(e, "#hero")} aria-label={`${personalInfo.name}, back to top`} className="font-display text-2xl tracking-wide no-underline">
          {personalInfo.monogram}
          <span className="text-lime">.</span>
        </a>

        <ul
          id="site-menu"
          className={`menu-panel fixed inset-x-0 top-16 bottom-0 flex flex-col justify-end gap-1 bg-bg px-5 pb-12 md:static md:flex md:flex-row md:gap-8 md:bg-transparent md:p-0 ${open ? "open" : ""}`}
          style={{ listStyle: "none", margin: 0 }}
        >
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                aria-current={active === item.href ? "true" : undefined}
                className={`block py-1 text-[3.2rem] leading-[1.05] no-underline transition-colors font-display uppercase md:py-2 md:font-body md:text-base md:normal-case md:font-medium ${
                  active === item.href ? "text-lime" : "text-ink md:text-mute"
                } hover:text-lime`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="min-h-11 cursor-pointer border-0 bg-transparent px-1 font-bold text-ink md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
    </header>
  );
}
