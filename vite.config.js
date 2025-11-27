import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/prjct/', // Замените 'prjct' на имя вашего репозитория
  build: {
    outDir: 'docs'
  }
})

