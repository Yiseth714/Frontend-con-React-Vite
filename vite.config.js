import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import basicSsl from '@vitejs/plugin-basic-ssl'
//import fs from 'fs'
import http from 'http'

const LOCAL_HTTP_HOST = '127.0.0.1'
const LOCAL_HTTP_PORT = 5174

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
//    basicSsl(), // Habilita HTTPS en el dev server
    {
      name: 'local-http-server',
      configureServer(server) {
        const localHttpServer = http.createServer(server.middlewares)

        server.httpServer?.once('listening', () => {
          localHttpServer.listen(LOCAL_HTTP_PORT, LOCAL_HTTP_HOST, () => {
            console.log(`Local-only HTTP disponible en http://${LOCAL_HTTP_HOST}:${LOCAL_HTTP_PORT}`)
          })
        })

        server.httpServer?.once('close', () => {
          localHttpServer.close()
        })
      },
    },
  ],
  server: {
    port: 5173,
    host: '192.168.1.13',  // Acepta conexiones externas (el celular)
    https: true,
  },
})
