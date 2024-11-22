// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel(),
  endpoints: {
    // Explicitly allow /api routes
    "/api/*": { path: "/api", mode: "server" },
  },
});
