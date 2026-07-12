import { motion } from "framer-motion";
import { ArrowRight, PackageSearch } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen min-h-[680px] flex flex-col justify-end bg-brand-navy-deep">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video-herosection.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-deep/90 via-brand-navy-deep/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-navy-deep/70 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-brand-navy-deep/75 via-brand-navy-deep/25 to-transparent" />

      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-10 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-brand-orange font-semibold tracking-[0.3em] uppercase text-xs mb-5 flex items-center gap-4">
            <span className="w-10 h-px bg-brand-orange" /> Conexão logística nacional
          </p>
          <p className="text-white/80 text-lg md:text-xl max-w-lg leading-relaxed mb-8">
            Diariamente pensamos a melhor rota para os nossos clientes, com agilidade,
            segurança e rastreabilidade em cada entrega.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contato"
              className="bg-brand-orange text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-brand-orange-light transition-colors flex items-center justify-center gap-2 rounded-full"
            >
              Fazer Cotação
              <ArrowRight size={18} />
            </a>
            <a
              href="#solucoes"
              className="bg-brand-navy-deep/40 border border-white/10 text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-brand-navy-deep/60 transition-colors flex items-center justify-center gap-2 rounded-full backdrop-blur-sm"
            >
              <PackageSearch size={18} />
              Rastrear Encomenda
            </a>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.95] font-bold uppercase tracking-tight text-white relative z-30 drop-shadow-2xl"
        >
          Rápido <br /> de <span className="text-brand-orange">Verdade.</span>
        </motion.h1>
      </div>
    </section>
  );
}
