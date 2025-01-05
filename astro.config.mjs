// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
    functionPerRoute: false,
    includeFiles: ["**/*.{jpg,png,svg}"],
  }),

  vite: {
    envPrefix: "NEXT_PUBLIC_",
    ssr: {
      noExternal: ["webcoreui"],
    },
  },
});
