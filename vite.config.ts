import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE lets the same code serve from "/" (custom domain / local) or a sub-path such as GitHub Pages.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
