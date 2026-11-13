import "./instrument.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sentry.ts";
import "./index.css";
import App from "./App.tsx";
import { AuthRoot } from "./auth/AuthRoot.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthRoot>
      <App />
    </AuthRoot>
  </StrictMode>,
);
