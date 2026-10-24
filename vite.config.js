import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base must match the GitHub Pages repo path: https://<user>.github.io/gpay-resolution-tracker/
// For a user/org root site or a custom domain, change this to '/'.
export default defineConfig({
  base: '/gpay-resolution-tracker/',
  plugins: [react(), tailwindcss()],
})
