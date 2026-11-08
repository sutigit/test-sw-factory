import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/bundler-plugins/vite";
import { defineConfig } from "vite";

function readReleaseTag(): string {
  const releaseTag = process.env.APP_RELEASE_TAG?.trim();

  if (releaseTag) {
    return releaseTag;
  }

  return "dev";
}

const releaseTag = readReleaseTag();

export default defineConfig({
  plugins: [
    react(),
    // Must stay after other plugins so the maps reflect the final bundle.
    sentryVitePlugin({
      org: "sutiobs",
      project: "test-sw-factory",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: { name: releaseTag },
      sourcemaps: {
        filesToDeleteAfterUpload: ["./dist/**/*.map"],
      },
      // Upload failures warn instead of failing the build, so deploys do not
      // break when the token is missing or Sentry is unreachable.
      errorHandler: (error) => console.warn(error),
    }),
  ],
  base: "/test-sw-factory/",
  build: {
    // Emits maps without a public sourceMappingURL comment, so browsers do not fetch them.
    sourcemap: "hidden",
  },
  define: {
    __APP_RELEASE_TAG__: JSON.stringify(releaseTag),
  },
});
