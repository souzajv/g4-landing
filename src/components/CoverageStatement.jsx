import ScrollReveal from "./ScrollReveal";
import FlightRoute from "./FlightRoute";

export default function CoverageStatement() {
  return (
    <section className="relative pt-28 md:pt-36 pb-20 bg-brand-offwhite border-b border-black/5 overflow-hidden">
      <FlightRoute className="pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        <ScrollReveal
          baseOpacity={0.15}
          baseRotation={2}
          blurStrength={5}
          textClassName="text-brand-navy"
        >
          Soluções logísticas em todo o território nacional, com agilidade, segurança e
          confiabilidade operacional de ponta a ponta.
        </ScrollReveal>
      </div>
    </section>
  );
}
