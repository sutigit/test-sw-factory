# Build the static Vite app, then serve it with nginx.
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_SENTRY_DSN
ARG APP_RELEASE_TAG=docker

ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN \
    VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID \
    VITE_SENTRY_DSN=$VITE_SENTRY_DSN \
    APP_RELEASE_TAG=$APP_RELEASE_TAG

RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Match Vite base `/test-sw-factory/` so Auth0 callbacks and asset URLs resolve.
COPY --from=build /app/dist /usr/share/nginx/html/test-sw-factory

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
