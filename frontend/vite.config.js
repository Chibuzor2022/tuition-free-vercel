// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   base: '/',
//   plugins: [
//     react(), 
//  tailwindcss()
//   ],
  
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  // Add this section 👇
  resolve: {
    alias: {},
  },
  // This ensures Vite builds as a single-page app
  esbuild: {
    legalComments: 'none',
  },
})
