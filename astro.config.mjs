import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import solidJs from "@astrojs/solid-js";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://astro.build/config
export default defineConfig({
  site: "https://c65351eb.astro-supabase-7t2.pages.dev",
  output: "hybrid",
  adapter: cloudflare(),
  integrations: [svelte(), tailwind(), solidJs()],

  vite: {
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true
          }),
          NodeModulesPolyfillPlugin()
        ]
      }
    },
    resolve: {
      alias: {
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        path: 'rollup-plugin-node-polyfills/polyfills/path',
        process: 'process/browser'
      }
    },
    ssr: {
      noExternal: ['picomatch', 'micromatch', 'svelte', 'svelte/internal']
    }
  },
});
