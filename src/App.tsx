import * as Sentry from "@sentry/react";
import "./App.css";
import { CrashDetonator } from "./CrashDetonator.tsx";
import { VersionTag } from "./VersionTag.tsx";

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
      <main className="container">
        <CrashDetonator />
        <VersionTag />
        <div className="square square-indigo" />
        <div className="square square-coral" />
      </main>
    </Sentry.ErrorBoundary>
  );
}

export default App;
