import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 💡 CORREÇÃO: Remova ou comente a linha 'base' para usar a raiz (/)
  // base: '/clubee-front/', 
  plugins: [react()],
})
