import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Manual chunk splitting (bundle-dynamic-imports rule)
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-state': ['@reduxjs/toolkit', 'react-redux', '@tanstack/react-query'],
          'vendor-three': ['three'],
          'vendor-auth': ['@supabase/supabase-js'],
          'vendor-stripe': ['@stripe/stripe-js'],
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps for debugging (disable in production if needed)
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'es2020',
  },
})
