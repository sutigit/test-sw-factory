# test-sw-factory

A sandbox for trying out software factory concepts.

Visitors must sign in with Auth0 before they can use the app. See [Authentication](#authentication).

## Docker

Build and run the app. Pass Auth0 values from `.env.local` at build time (Vite inlines `VITE_*` into the bundle; `.env.local` is not copied into the image):

```bash
docker compose --env-file .env.local up --build
```

Open [http://localhost:8080](http://localhost:8080) (redirects to `/test-sw-factory/`) or [http://localhost:8080/test-sw-factory/](http://localhost:8080/test-sw-factory/).

## Authentication

Auth0 Universal Login gates the whole SPA. Unauthenticated visitors are redirected to sign in before any app UI is shown.

### Auth0 application

1. Create an Auth0 application of type **Single Page Application**.
2. On the Settings tab, set:

**Allowed Callback URLs**

```
http://localhost:5173/test-sw-factory/,http://localhost:8080/test-sw-factory/,https://sutigit.github.io/test-sw-factory/
```

**Allowed Logout URLs**

```
http://localhost:5173/test-sw-factory/,http://localhost:8080/test-sw-factory/,https://sutigit.github.io/test-sw-factory/
```

**Allowed Web Origins**

```
http://localhost:5173,http://localhost:8080,https://sutigit.github.io
```

The app builds `redirect_uri` / logout `returnTo` as `window.location.origin + import.meta.env.BASE_URL`. Vite `base` is `/test-sw-factory/`, so callback and logout URLs must include that path and trailing slash.

### Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and set:

| Variable               | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `VITE_AUTH0_DOMAIN`    | Auth0 tenant domain (for example `your-tenant.auth0.com`) |
| `VITE_AUTH0_CLIENT_ID` | Auth0 SPA Client ID                                       |

Domain and Client ID are public SPA config. Vite still inlines `VITE_*` values at build time, so Docker and CI must receive them at build time too.

### CI

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) passes `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` from repository secrets into `npm run build`. Add those secrets (or migrate to vars if you prefer) before deploying.

## Observability

Sentry covers errors, performance tracing, session replay, and source maps.

- **Runtime**: `src/instrument.ts` starts the SDK only when `VITE_SENTRY_DSN` is set.
- **Source maps**: `npm run build` uploads hidden source maps when `SENTRY_AUTH_TOKEN` is set, then deletes the `.map` files from `dist/`. Without the token, the build warns and skips the upload.
- **CI**: `.github/workflows/deploy.yml` passes `VITE_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, and `APP_RELEASE_TAG` from the repository secrets and release tag.
