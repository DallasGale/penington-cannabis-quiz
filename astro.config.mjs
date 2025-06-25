// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  base: process.env.PUBLIC_BASE_URL,
  outDir: process.env.BUILD_OUTPUT_DIR,
  // output: "server", // beacuse there are serverless
  // functions involced in this project you will most
  // likely need to output with this "server" option instead.
  // If so, you will need to make sure your server is setup for cloud functions.
  output: "static",
  adapter: vercel(),
  vite: {
    envPrefix: "NEXT_PUBLIC_",
    ssr: {
      noExternal: ["webcoreui"],
    },
  },
});
