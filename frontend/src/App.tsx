/** @format */

import MockRequestButton from "./components/MockRequestButton";
import CounterButton from "./components/CounterButton";
import KeyBugList from "./components/KeyBugList";

function App() {
  return (
    <div style={styles.app}>
      <h1 style={styles.title}>React Demo App</h1>
      <div style={styles.grid}>
        <MockRequestButton />
        <CounterButton />
        <KeyBugList />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, sans-serif",
    backgroundColor: "#f9fafb",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#111827",
  },
  grid: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default App;
