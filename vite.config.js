import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001', // ✅ Use IPv4 explicitly
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist/app',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
