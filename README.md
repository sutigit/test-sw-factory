# test-sw-factory

A sandbox for trying out software factory concepts.

## Docker

Build and run the app:

```bash
docker compose up --build
```

Open [http://localhost:8080](http://localhost:8080).

## Observability

Sentry covers errors, performance tracing, session replay, and source maps.

- **Runtime**: `src/instrument.ts` starts the SDK only when `VITE_SENTRY_DSN` is set.
- **Source maps**: `npm run build` uploads hidden source maps when `SENTRY_AUTH_TOKEN` is set, then deletes the `.map` files from `dist/`. Without the token, the build warns and skips the upload.
- **CI**: `.github/workflows/deploy.yml` passes `VITE_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, and `APP_RELEASE_TAG` from the repository secrets and release tag.
