import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Pisahkan vendor agar cache jangka panjang lebih efisien
        // (perubahan kode aplikasi tidak membatalkan cache React).
        // Catatan: Rolldown (Vite 8) hanya menerima manualChunks sebagai fungsi.
        manualChunks(id) {
          if (id.includes('node_modules/react')) return 'react'
          return undefined
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.test.{js,jsx}'],
    css: false,
  },
})
