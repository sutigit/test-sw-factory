export type Auth0SpaConfig = {
  domain: string;
  clientId: string;
  redirectUri: string;
};

export function getAppReturnTo(): string {
  return `${window.location.origin}${import.meta.env.BASE_URL}`;
}

export function readAuth0Config(): Auth0SpaConfig | null {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN?.trim() ?? "";
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID?.trim() ?? "";

  if (!domain || !clientId) {
    return null;
  }

  return {
    domain,
    clientId,
    redirectUri: getAppReturnTo(),
  };
}

export const AUTH0_CONFIG_MISSING_MESSAGE =
  "Missing VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID. Copy .env.example to .env.local and set both values.";
