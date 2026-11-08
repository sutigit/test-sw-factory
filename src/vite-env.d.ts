/// <reference types="vite/client" />

declare const __APP_RELEASE_TAG__: string;

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
