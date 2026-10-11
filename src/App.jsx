import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "./animations/gsapConfig";
import SmoothScroll from "./components/layout/SmoothScroll";
import PageLoader from "./components/layout/PageLoader";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Approach from "./sections/Approach";
import Contact from "./sections/Contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const handleDone = useCallback(() => setReady(true), []);

  // recalculate trigger positions once web fonts have loaded and changed text sizes
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-lime focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <CustomCursor />
      <PageLoader onDone={handleDone} />
      <Navbar ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
