import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/app-to-do-list/', // 👈 nombre EXACTO del repo en GitHub
  build: {
    outDir: 'dist'
  }
})
