import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  publicDir: "../docs",
  plugins: [svelte()],
  server: {
    port: 5000
  },
  build: {
    outDir: '../docs',
  },
  optimizeDeps: {
    include: ['@carbon/charts']
  }
})
