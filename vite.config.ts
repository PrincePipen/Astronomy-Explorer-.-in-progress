import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // Ensures environment variables are properly handled
    'process.env': {}
  },
  server: {
    // Add proper CORS headers for development
    cors: true
  }
});
