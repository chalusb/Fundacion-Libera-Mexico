// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    server: {
      allowedHosts: ['fundacion-libera-mexico-production.up.railway.app'],
    },
  },
});
