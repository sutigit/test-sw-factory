import "./App.css";
import { CrashDetonator } from "./CrashDetonator.tsx";

function App() {
  return (
    <main className="container">
      <CrashDetonator />
      <div className="square square-indigo" />
      <div className="square square-coral" />
    </main>
  );
}

export default App;
