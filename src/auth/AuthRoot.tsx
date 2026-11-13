import { Auth0Provider } from "@auth0/auth0-react";
import type { ReactNode } from "react";
import "./auth.css";
import { AUTH0_CONFIG_MISSING_MESSAGE, readAuth0Config } from "./authConfig.ts";
import { RequireAuth } from "./RequireAuth.tsx";

type AuthRootProps = {
  children: ReactNode;
};

export function AuthRoot({ children }: AuthRootProps) {
  const config = readAuth0Config();

  if (!config) {
    console.error("Auth0 configuration error", AUTH0_CONFIG_MISSING_MESSAGE);
    return (
      <p className="auth-status auth-status-error">
        {AUTH0_CONFIG_MISSING_MESSAGE}
      </p>
    );
  }

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      authorizationParams={{
        redirect_uri: config.redirectUri,
      }}
    >
      <RequireAuth>{children}</RequireAuth>
    </Auth0Provider>
  );
}
