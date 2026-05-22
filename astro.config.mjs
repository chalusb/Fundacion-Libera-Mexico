// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()],
  devToolbar: {
    enabled: false,
  },
  vite: {
    server: {
      allowedHosts: [
        'fundacion-libera-mexico-production.up.railway.app',
        'liberamexico.org',
        'fundacionliberamexico.org',
        'liberamexico.com',
        'www.liberamexico.com',
      ],
    },
  },
});
