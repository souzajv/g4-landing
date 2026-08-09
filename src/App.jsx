import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Tudo abaixo da dobra sai do bundle inicial: o navegador só precisa de
// Navbar + Hero para pintar a primeira tela. Os demais chunks são buscados
// assim que a página termina de carregar (ver abaixo), então já estão em
// cache quando o usuário rola.
//
// SmoothScroll entra aqui também: ele arrasta GSAP + Lenis (~150KB) e é puro
// refinamento — a página rola normalmente sem ele nos primeiros instantes.
const SmoothScroll = lazy(() => import("./components/SmoothScroll"));
const CoverageStatement = lazy(() => import("./components/CoverageStatement"));
const ProcessTimeline = lazy(() => import("./components/ProcessTimeline"));
const Stats = lazy(() => import("./components/Stats"));
const WhyUs = lazy(() => import("./components/WhyUs"));
const Solutions = lazy(() => import("./components/Solutions"));
const ClientsMarquee = lazy(() => import("./components/ClientsMarquee"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const prefetch = () => {
  import("./components/SmoothScroll");
  import("./components/CoverageStatement");
  import("./components/ProcessTimeline");
  import("./components/Stats");
  import("./components/WhyUs");
  import("./components/Solutions");
  import("./components/ClientsMarquee");
  import("./components/Contact");
  import("./components/Footer");
};

export default function App() {
  useEffect(() => {
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    let id;
    const run = () => {
      id = schedule(prefetch, { timeout: 3000 });
    };

    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });

    return () => {
      window.removeEventListener("load", run);
      if (id && window.cancelIdleCallback) window.cancelIdleCallback(id);
    };
  }, []);

  return (
    <div className="bg-brand-offwhite text-brand-ink antialiased">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <SmoothScroll />
        <CoverageStatement />
        <ProcessTimeline />
        <Stats />
        <WhyUs />
        <Solutions />
        <ClientsMarquee />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}
