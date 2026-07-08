// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Deploy target: Netlify. Nitro produces a Netlify Functions build under
  // .netlify/ that `netlify deploy` / the Netlify build plugin picks up
  // automatically. Note: inside a Lovable-managed build the preset is forced
  // back to Cloudflare; this override only applies to self-hosted builds
  // (e.g. Netlify CI running `npm run build`).
  nitro: {
    preset: "netlify",
  },
});
