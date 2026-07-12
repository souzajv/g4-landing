# G4 Express — Landing Page

Landing page da G4 Express, reconstruída com a estrutura/estilo de referência (`landing-page-exemplo.html`) e a paleta de cores real do site atual (g4express.com.br) e da apresentação institucional.

## Stack
- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`, tema custom em `src/index.css`)
- Framer Motion (animações de entrada ao rolar a página)
- lucide-react (ícones)

## Rodando o projeto

```bash
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção (pasta dist/)
npm run preview   # pré-visualizar o build
```

## Paleta de cores (extraída do site atual)
- Azul primário: `#0505FF` (`brand-blue`)
- Azul secundário: `#2575FC` (`brand-blue-light`)
- Azul marinho (fundo escuro): `#001233` / `#000A1F` (`brand-navy` / `brand-navy-deep`)
- Laranja (destaque/CTA): `#FF8219` (`brand-orange`)
- Fundo claro: `#F9F9F9` (`brand-offwhite`)

Definidas em `src/index.css` dentro do bloco `@theme`.

## Estrutura
```
src/
  components/
    Navbar.jsx
    Hero.jsx              -> vídeo de fundo (public/video-herosection.mp4)
    CoverageStatement.jsx
    WhyUs.jsx              -> "Por que escolher a G4 Express"
    Stats.jsx              -> números animados (Counter.jsx)
    ProcessTimeline.jsx    -> linha do tempo de operação
    Solutions.jsx          -> 5 modalidades de transporte
    TrustStrip.jsx
    ClientsMarquee.jsx     -> carrossel infinito de clientes
    Contact.jsx            -> formulário de cotação (UI apenas, sem backend)
    Footer.jsx
    Reveal.jsx             -> wrapper de animação de entrada (scroll)
    Counter.jsx            -> contador animado
```

## Imagens
As fotos em `public/images/` foram extraídas da apresentação institucional
oficial da G4 Express (frota, armazém). O vídeo do hero foi comprimido de
85MB (4K) para ~28MB (1080p, sem áudio) para melhor performance web.

## Próximos passos sugeridos
- Conectar o formulário de cotação (`Contact.jsx`) a um endpoint real (e-mail, CRM ou API).
- Substituir as fotos de apoio das seções "Aéreo" e "Logística Reversa" por fotos próprias da G4, se disponíveis.
- Revisar textos institucionais com o time de marketing antes de publicar.
