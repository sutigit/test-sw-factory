import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function readReleaseTag(): string {
  const releaseTag = process.env.APP_RELEASE_TAG?.trim();

  if (releaseTag) {
    return releaseTag;
  }

  return "dev";
}

export default defineConfig({
  plugins: [react()],
  base: "/test-sw-factory/",
  define: {
    __APP_RELEASE_TAG__: JSON.stringify(readReleaseTag()),
  },
});
