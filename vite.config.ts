import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? 'https://skinwallet.itsua.co/panel/' : '/',
  plugins: [
    react(),
    svgr(),
  ],
})
