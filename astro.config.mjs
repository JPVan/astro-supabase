import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-supabase.pages.dev",
  output: "server",
  adapter: cloudflare(),
  integrations: [tailwind(), solidJs()],
});
