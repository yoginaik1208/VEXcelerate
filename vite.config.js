import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      closeBundle() {
        try {
          copyFileSync('CNAME', 'dist/CNAME')
        } catch (e) {
          console.warn('Could not copy CNAME file:', e.message)
        }
      }
    }
  ],
  server: {
    proxy: {
      '/re': {
        target: 'https://www.robotevents.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/re/, ''),
      },
    },
  },
})
