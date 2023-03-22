import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
import path from 'path';

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  server: {
      host: true,
  }
});
