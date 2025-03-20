// @ts-check
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Enables SSR
  output: "server",
  integrations: [react()]
});