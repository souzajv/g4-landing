import { motion } from "framer-motion";
import { ArrowRight, PackageSearch, MapPin } from "lucide-react";
import { TRACKING_URL } from "../lib/links";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-end overflow-hidden bg-[#000a1f]">
      <HeroVideo
        src="/video/g4-na-estrada.mp4"
        poster="/images/g4-na-estrada-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#000a1f]/70 via-[#000a1f]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#000a1f]/70 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-full md:w-3/5 bg-gradient-to-r from-[#000a1f]/75 via-[#000a1f]/25 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/5 bg-gradient-to-l from-[#000a1f]/70 via-[#000a1f]/20 to-transparent" />

      <div className="page-container relative z-20 grid gap-6 md:gap-10 pt-32 pb-14 lg:grid-cols-12 lg:pb-20">
        <div className="lg:col-span-8">
         

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.95] font-bold uppercase tracking-tight text-white drop-shadow-2xl"
          >
            Rápido <br /> de Verdade
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <a
              href="#contato"
              className="bg-brand-blue-light text-white px-6 py-3 min-h-11 text-xs md:px-8 md:py-4 md:text-sm font-semibold uppercase tracking-widest hover:bg-brand-blue transition-colors flex items-center justify-center gap-2 rounded-md shadow-2xl"
            >
              Fazer Cotação
              <ArrowRight size={18} />
            </a>
            <a
              href={TRACKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange border border-white/25 text-white px-6 py-3 min-h-11 text-xs md:px-8 md:py-4 md:text-sm font-semibold uppercase tracking-widest hover:bg-brand-orange-dark transition-colors flex items-center justify-center gap-2 rounded-md backdrop-blur-sm shadow-2xl"
            >
              Rastrear Encomenda
              <PackageSearch size={18} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex items-end lg:col-span-4 lg:justify-end"
        >
          <div className="max-w-sm border-l-2 border-white/30 pl-4 md:pl-5">
            <p className="text-sm leading-6 md:text-base md:leading-7 text-white">
              Diariamente pensamos a melhor rota para os nossos clientes, com agilidade,
              segurança e rastreabilidade em cada entrega.
            </p>
            <div className="mt-3 md:mt-5 flex items-center gap-3 text-xs text-white/85">
              <MapPin size={16} />
              Cobertura nacional
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
