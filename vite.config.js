import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl() // Habilita HTTPS en el dev server
  ],
  server: {
    port: 5173,
    host: '0.0.0.0',  // Acepta conexiones externas (el celular)
    https: true,
  },
})