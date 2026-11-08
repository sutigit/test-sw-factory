import "./App.css";
import { CrashDetonator } from "./CrashDetonator.tsx";
import { VersionTag } from "./VersionTag.tsx";

function App() {
  return (
    <main className="container">
      <CrashDetonator />
      <VersionTag />
      <div className="square square-indigo" />
      <div className="square square-coral" />
    </main>
  );
}

export default App;
