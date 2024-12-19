import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  testEnvironment: 'jsdom',
  plugins: [react()],
  server: {
    host: true,
    port: process.env.PORT || 4012,
    strictPort: true
  },
});

