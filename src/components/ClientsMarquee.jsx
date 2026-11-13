import { useRef } from "react";
import Reveal from "./Reveal";
import StatsRoute from "./StatsRoute";

// Cada logo carrega o tamanho em que deve ser renderizada (w/h em px). Os
// valores foram calculados para igualar a ÁREA ocupada por todas, não a
// altura: uma logo 7:1 e uma quadrada com a mesma altura têm pesos visuais
// completamente diferentes, e era isso que fazia o espaçamento parecer
// desbalanceado. Com áreas iguais e uma margem constante, o intervalo entre
// duas logos vizinhas é sempre o mesmo.
//
// boxed: o arquivo tem fundo próprio, então a imagem recebe cantos
// arredondados para o bloco não ficar quadrado sobre a seção.
const clients = [
  { name: "QuintoAndar", src: "/logos/Logo_3_QuintoAndar.webp", w: 165, h: 22 },
  { name: "BTG Pactual", src: "/logos/btg.webp", w: 95, h: 38 },
  { name: "Banco PAN", src: "/logos/pan.webp", w: 87, h: 41 },
  { name: "Ri Happy", src: "/logos/ri-happy.webp", w: 124, h: 29, boxed: true },
  { name: "Novotel", src: "/logos/novotel.webp", w: 56, h: 56, boxed: true },
  { name: "Locaweb", src: "/logos/locaweb.webp", w: 56, h: 56, boxed: true },
  { name: "Kopenhagen", src: "/logos/Kopenhagen.webp", w: 56, h: 56, boxed: true },
  { name: "Chocolates Brasil Cacau", src: "/logos/brasil-cacau-seeklogo.webp", w: 96, h: 37 },
  { name: "l'Oeil", src: "/logos/loeil.webp", w: 56, h: 56, boxed: true },
  { name: "Blockbit", src: "/logos/blockbit-dark.png", w: 129, h: 28 },
  { name: "Estapar", src: "/logos/Estapar.webp", w: 55, h: 56, boxed: true },
  { name: "CTG Brasil", src: "/logos/ctg.png", w: 125, h: 29 },
  { name: "Sorridents", src: "/logos/Sorridents.webp", w: 56, h: 56, boxed: true },
  { name: "UD House", src: "/logos/ud-dark.png", w: 143, h: 25 },
  { name: "SG Global Group", src: "/logos/sgglobal-dark.png", w: 119, h: 30 },
  { name: "BRQ Digital", src: "/logos/brq.png", w: 80, h: 45 },
  { name: "Pimenta Print", src: "/logos/pimenta-print-dark.png", w: 89, h: 41 },
  { name: "by Kamy", src: "/logos/kamy.png", w: 115, h: 31, boxed: true },
];

const mid = Math.ceil(clients.length / 2);
const rowA = clients.slice(0, mid);
const rowB = clients.slice(mid);

function Logo({ client }) {
  return (
    <div
      className="logo-slot shrink-0 mx-5 md:mx-7 h-14 md:h-16 flex items-center justify-center"
      style={{ "--lw": client.w, "--lh": client.h }}
    >
      <img
        src={client.src}
        alt={client.name}
        loading="lazy"
        className={`object-contain ${client.boxed ? "rounded-md" : ""}`}
        style={{
          width: "calc(var(--lw) * var(--ls) * 1px)",
          height: "calc(var(--lh) * var(--ls) * 1px)",
        }}
      />
    </div>
  );
}

function Row({ items, reverse }) {
  const loop = [...items, ...items];
  return (
    <div
      className="flex w-max items-center"
      style={{
        animation: `marquee ${reverse ? "42s" : "36s"} linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {loop.map((client, i) => (
        <Logo key={`${client.name}-${i}`} client={client} />
      ))}
    </div>
  );
}

export default function ClientsMarquee() {
  const sectionRef = useRef(null);

  return (
    <section
      id="clientes"
      ref={sectionRef}
      className="relative py-24 bg-brand-offwhite overflow-hidden"
    >
      {/* mesmo traçado da seção Stats, mas em azul: o branco padrão some
          sobre o off-white desta seção */}
      <StatsRoute
        sectionRef={sectionRef}
        color="var(--color-brand-blue-light)"
        opacity={0.28}
        className="left-0 bottom-[50%] w-full h-40 hidden lg:block"
      />
      <div className="page-container mb-12 relative">
        <Reveal>
          <h2 className="text-center font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-blue-light leading-[0.95] mb-10 md:mb-0">
            Empresas que confiam no nosso <span className="text-brand-orange">trabalho</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative space-y-8">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-offwhite to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-offwhite to-transparent z-10" />
          <Row items={rowA} />
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-offwhite to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-offwhite to-transparent z-10" />
          <Row items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
