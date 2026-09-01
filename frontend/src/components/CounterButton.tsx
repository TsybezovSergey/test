/** @format */

import { useState } from "react";

type CounterAction = "increment" | "incrementTriple" | "decrement" | "reset";

export default function CounterButton() {
  const [count, setCount] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = String(e.currentTarget) as CounterAction;

    switch (action) {
      case "increment":
        setCount(count + 1);
        break;
      case "incrementTriple":
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        break;
      case "decrement":
        setCount(count - 1);
        break;
      case "reset":
        setCount(0);
        break;
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>Counter</h2>
      <p style={styles.count}>{count}</p>
      <div style={styles.row}>
        <button
          style={{ ...styles.btn, backgroundColor: "#22c55e" }}
          data-action="increment"
          onClick={handleClick}
        >
          +1
        </button>
        <button
          style={{ ...styles.btn, backgroundColor: "#8b5cf6" }}
          data-action="incrementTriple"
          onClick={handleClick}
        >
          +3
        </button>
        <button
          style={{ ...styles.btn, backgroundColor: "#ef4444" }}
          data-action="decrement"
          onClick={handleClick}
        >
          -1
        </button>
        <button
          style={{ ...styles.btn, backgroundColor: "#6b7280" }}
          data-action="reset"
          onClick={handleClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: 24,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    textAlign: "center",
  },
  count: {
    fontSize: 48,
    fontWeight: "bold",
    margin: "8px 0",
  },
  row: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
  },
  btn: {
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },
};
