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
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg']
  // Removed proxy configuration since we're using the deployed backend
})
