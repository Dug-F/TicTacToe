import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Configuration options for Vitest
    globals: true, // Enables global test functions like `test` and `expect`
    environment: "jsdom", // Sets up a browser-like environment for testing React components
    // You can add more Vitest-specific configuration options here as needed
  },
});
