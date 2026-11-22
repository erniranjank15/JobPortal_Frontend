import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://job-portal-bzx9.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react(), tailwindcss()],
})