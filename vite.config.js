import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/Rise-Of-The-Elites-/', // 👈 VERY important!
  build: {
    outDir: 'dist',
  },
});
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'Rise of the Elites',
      short_name: 'Elites',
      start_url: './index.html',
      display: 'fullscreen',
      background_color: '#1d1d1d',
      theme_color: '#00ffcc',
      icons: [
        {
          src: '/assets/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/assets/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
});
