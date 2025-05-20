// shared-components/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../public/client/components',
    lib: {
      entry: './index.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: {
        DialogBox: './DialogBox/DialogBox.jsx',
      },
      output: {
        entryFileNames: '[name]/[name].js',
        dir: '../public/client/components',
        globals: {
          react: 'React', // ✅ Expect global `React`
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
