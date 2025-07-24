import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MNIT_Internship/', 
  build: {
    outDir: 'build',
  },
  server: {
    historyApiFallback: true
  }
})