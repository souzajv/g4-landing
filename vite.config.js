import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Sem isso tudo vira um único bundle de ~550KB. Separando por
    // biblioteca, cada uma é cacheada de forma independente entre deploys e
    // o chunk crítico fica bem menor.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
          if (id.includes('lenis')) return 'lenis'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react')) return 'react'
        },
      },
    },
  },
})
