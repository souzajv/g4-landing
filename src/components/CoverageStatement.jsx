import ScrollReveal from "./ScrollReveal";
import FlightRoute from "./FlightRoute";

export default function CoverageStatement() {
  return (
    <section className="relative pt-16 md:pt-40 pb-20 bg-brand-offwhite">
      <FlightRoute className="pointer-events-none" />

      <div className="page-container relative z-10">
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
