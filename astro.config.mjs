import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // markdown: { shikiConfig: { theme: "css-variables" } },
  site: "https://example.com",
  integrations: [mdx(), sitemap()]
});
