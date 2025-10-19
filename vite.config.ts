// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/optician/', // اسم المستودع هنا مهم جدًا
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
