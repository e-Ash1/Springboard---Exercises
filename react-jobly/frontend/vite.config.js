import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    proxy: {
      "/auth": {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (p => p += `/login`)
      },
    },
  }
});
