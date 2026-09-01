/** @format */

import { useState, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { mockApiCall } from "../utils/mockApi";

export default function MockRequestButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const context = useContext(NotificationContext);

  const handleClick = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await mockApiCall();
      setResult(response.data);
      context?.addNotification("Request succeeded!", "info");
    } catch (error: any) {
      context?.addNotification(error.message, "error");
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>Mock Request</h2>
      <button style={styles.button} onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Send Request"}
      </button>
      {result && <p style={styles.result}>{result}</p>}
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
  button: {
    padding: "10px 24px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },
  result: {
    marginTop: 12,
    fontSize: 14,
    color: "#374151",
  },
};
