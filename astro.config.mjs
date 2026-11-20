// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.pappaya.com.br',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/obrigado'),
    }),
  ],
  redirects: {
    // URL do site antigo que tinha tráfego indexado
    '/desenvolvimento_site': '/solucoes',
    '/contato': '/sobre#formulario',
  },
});
