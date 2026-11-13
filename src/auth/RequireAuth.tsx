import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, type ReactNode } from "react";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }

    void loginWithRedirect();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) {
    return <p className="auth-status">Checking sign-in…</p>;
  }

  if (!isAuthenticated) {
    return <p className="auth-status">Redirecting to sign in…</p>;
  }

  return children;
}
