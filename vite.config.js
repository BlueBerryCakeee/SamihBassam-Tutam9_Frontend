import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Ensure assets like images are properly processed
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  // Configure proxy for API requests to use Railway backend
  server: {
    proxy: {
      '/api': {
        target: 'https://samihbassam-tutam9-backend.railway.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  // Define environment variables for use in the application
  define: {
    'process.env.VITE_API_URL': JSON.stringify('https://samihbassam-tutam9-backend.railway.app')
  }
})
