import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://jobscibe.onrender.com', // backend server ka port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
