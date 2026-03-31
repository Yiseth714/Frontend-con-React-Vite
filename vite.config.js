import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl() // Habilita HTTPS en el dev server
  ],
  server: {
    port: 5173,
    host: '0.0.0.0',  // Acepta conexiones externas (el celular)
    https: {                                    
      key:  fs.readFileSync('../Backend-con-fastApi/certs/localhost+2-key.pem'),  
      cert: fs.readFileSync('../Backend-con-fastApi/certs/localhost+2.pem'),      
    }

  },
})
