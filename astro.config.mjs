import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://raymondzhao.com",
  integrations: [svelte(), tailwind(), sitemap()],
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'prism'
  }
});
