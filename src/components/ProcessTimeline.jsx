import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import "./ProcessTimeline.css";
import TruckSolid from "./TruckSolid";
import { FileSearch, CalendarCheck, Radar, PackageCheck, FileCheck2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stepImages = [
  { src: "/images/steps/cotacao.jpg", alt: "Cálculo de orçamento com calculadora e computador", position: "50% 65%" },
  { src: "/images/steps/coleta.jpg", alt: "Profissionais carregando caixas em um veículo de coleta", position: "50% 50%" },
  { src: "/images/steps/monitoramento.jpg", alt: "Tela de navegação GPS mostrando a rota em andamento", position: "50% 65%" },
  { src: "/images/steps/entrega.jpg", alt: "Encomendas sendo entregues ao destinatário", position: "50% 50%" },
  { src: "/images/steps/comprovante.jpg", alt: "Destinatária assinando o comprovante digital no celular", position: "50% 50%" },
];
const steps = [
  { n: "01", icon: FileSearch, title: "Cotação rápida", desc: "Apenas um clique para solicitar sua cotação, com resposta ágil da nossa equipe." },
  { n: "02", icon: CalendarCheck, title: "Coleta agendada", desc: "Programação da coleta com o veículo mais adequado para o seu tipo de carga." },
  { n: "03", icon: Radar, title: "Transporte monitorado", desc: "Rastreamento ativo por GPS e acompanhamento pela nossa central 24h." },
  { n: "04", icon: PackageCheck, title: "Entrega confirmada", desc: "Descarregamento seguro no destino, com conferência e assinatura do recebedor." },
  { n: "05", icon: FileCheck2, title: "Comprovante digital", desc: "Envio imediato do canhoto digital e emissão automática da documentação." },
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const lineDesktopRef = useRef(null);
  const lineMobileRef = useRef(null);
  const packageDesktopRef = useRef(null);
  const packageMobileRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineDesktopRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(lineMobileRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(packageDesktopRef.current, { left: "0%", xPercent: -50, yPercent: -50 });
      gsap.set(packageMobileRef.current, { top: "0%", xPercent: -50, yPercent: -50 });

      const trigger = {
        trigger: trackRef.current,
        start: "top 75%",
        end: "center center",
        scrub: 2.375,
      };

      gsap.to([lineDesktopRef.current, lineMobileRef.current], {
        scaleX: 1,
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          ...trigger,
          onUpdate: (self) => {
            const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            setActiveIndex(idx);
          },
          onLeaveBack: () => setActiveIndex(-1),
        },
      });

      gsap.to(packageDesktopRef.current, { left: "100%", ease: "none", scrollTrigger: trigger });
      gsap.to(packageMobileRef.current, { top: "100%", ease: "none", scrollTrigger: trigger });

    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="process-section relative bg-brand-offwhite" aria-labelledby="process-heading">
      <div className="page-container process-section-content">
        <div className="process-heading-row">
          <Reveal>
          <h2 id="process-heading" className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-blue-light leading-[0.95]">
            Como funciona a<span className="text-brand-orange"> operação?</span>
          </h2>
          </Reveal>
          <Reveal className="process-heading-description" delay={0.15} amount={0.3}>
          <p className="m-0">Da primeira cotação à confirmação da entrega, nossa operação conecta <strong className="text-brand-blue-light">planejamento</strong>, coleta e transporte <strong className="text-brand-orange">monitorado</strong>. Em cada etapa, a equipe acompanha sua carga e mantém as informações do percurso organizadas, até o envio do comprovante digital.</p>
          </Reveal>
        </div>

        <div ref={trackRef} className="process-cards-track">
          <div className="process-line-desktop" aria-hidden="true" />
          <div ref={lineDesktopRef} className="process-line-desktop process-line-fill" aria-hidden="true" />
          <div ref={packageDesktopRef} className="process-truck-desktop" aria-hidden="true">
            <TruckSolid size={28} />
          </div>
          <div className="process-line-mobile" aria-hidden="true" />
          <div ref={lineMobileRef} className="process-line-mobile process-line-fill" aria-hidden="true" />
          <div ref={packageMobileRef} className="process-truck-mobile" aria-hidden="true">
            <TruckSolid size={24} />
          </div>

          <ol className="process-cards">
            {steps.map((step, index) => (
              <li key={step.n} className="process-card-item" data-active={index <= activeIndex} aria-current={index === activeIndex ? "step" : undefined}>
                <Reveal className="process-card" delay={index * 0.1}>
                <div className="process-icon-container">
                  <step.icon className="process-card-icon" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className={`process-card-copy transition-all duration-[875ms] ease-out ${index <= activeIndex ? "blur-0 opacity-100" : "blur-[6px] opacity-40"}`}>
                  <span className="process-step-number font-display" aria-hidden="true">{index + 1}º</span>
                  <img className="process-step-image" src={stepImages[index].src} alt={stepImages[index].alt} width="600" height="300" loading="lazy" style={{ objectPosition: stepImages[index].position }} />
                  <div className="process-step-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  </div>
                </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}