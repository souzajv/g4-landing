import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Página Inicial", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Por Que", href: "#por-que" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-brand-navy-deep/40 backdrop-blur-sm border-b border-white/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center h-20">
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-brand-blue">G</span>
            <span className="text-brand-orange">4</span>
            <span className="text-white"> Express</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-0.5">
            Rápido de Verdade
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-white/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-orange transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contato"
          className="hidden md:flex items-center gap-2 bg-brand-orange text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-brand-orange-light transition-colors"
        >
          Rastreie sua encomenda
          <ArrowUpRight size={16} />
        </a>

        <button className="md:hidden text-white" onClick={() => setOpen((o) => !o)} aria-label="Abrir menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-brand-navy-deep/98 backdrop-blur overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5 text-white/90 uppercase tracking-widest text-sm font-medium">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="bg-brand-orange text-white text-center py-3 rounded-full mt-2"
              >
                Rastreie sua encomenda
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
