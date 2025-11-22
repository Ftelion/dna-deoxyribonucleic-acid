import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          'three-vendor': ['three', 'three-stdlib', '@react-three/fiber', '@react-three/drei'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'state-vendor': ['zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
