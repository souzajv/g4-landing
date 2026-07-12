import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CoverageStatement from "./components/CoverageStatement";
import WhyUs from "./components/WhyUs";
import Stats from "./components/Stats";
import ProcessTimeline from "./components/ProcessTimeline";
import Solutions from "./components/Solutions";
import TrustStrip from "./components/TrustStrip";
import ClientsMarquee from "./components/ClientsMarquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-brand-offwhite text-brand-ink antialiased">
      <Navbar />
      <Hero />
      <CoverageStatement />
      <WhyUs />
      <Stats />
      <ProcessTimeline />
      <Solutions />
      <TrustStrip />
      <ClientsMarquee />
      <Contact />
      <Footer />
    </div>
  );
}
