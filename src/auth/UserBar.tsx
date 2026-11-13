import { useAuth0 } from "@auth0/auth0-react";
import { getAppReturnTo } from "./authConfig.ts";

export function UserBar() {
  const { user, logout } = useAuth0();
  const displayName = user?.name ?? user?.email ?? "Signed in";

  return (
    <div className="user-bar">
      <span className="user-bar-name">{displayName}</span>
      <button
        type="button"
        className="user-bar-logout"
        onClick={() =>
          void logout({
            logoutParams: { returnTo: getAppReturnTo() },
          })
        }
      >
        Log out
      </button>
    </div>
  );
}
