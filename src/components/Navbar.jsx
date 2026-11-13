import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PackageSearch } from "lucide-react";
import { TRACKING_URL } from "../lib/links";

const links = [
  { label: "Página Inicial", href: "#inicio" },
  { label: "Como Funciona", href: "#sobre" },
  { label: "Por Quê", href: "#por-que" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      // never hide while the mobile menu is open, and don't hide near the very top
      if (!open) {
        if (currentY > lastScrollY.current && currentY > 120) {
          setHidden(true);
        } else if (currentY < lastScrollY.current) {
          setHidden(false);
        }
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-brand-navy-deep/40 backdrop-blur-sm shadow-lg" : "bg-transparent"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="page-container py-2 flex justify-between items-center">
        <a href="#inicio" className="flex flex-col leading-none">
          <img src="/logo-g4-express.webp" alt="G4 Express" className="h-12 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-widest font-medium text-white">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-orange transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={TRACKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-brand-orange text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-md hover:bg-brand-orange-dark transition-colors"
        >
          Rastrear
          <PackageSearch size={18} />
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
            <div className="flex flex-col px-6 py-6 gap-5 text-white/90 tracking-widest text-sm font-medium">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a
                href={TRACKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-brand-orange text-white py-3 rounded-md mt-2"
              >
                <PackageSearch size={16} />
                Rastreie sua encomenda
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
