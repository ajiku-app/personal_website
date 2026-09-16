import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Ganti "site" dengan domain kamu sendiri nanti (untuk sitemap & SEO)
export default defineConfig({
  site: 'https://ajiku.vercel.app/',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
