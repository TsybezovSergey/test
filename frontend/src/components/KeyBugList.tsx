/** @format */

import { useRef, useState } from "react";

interface Item {
  id: number;
  name: string;
}

const FRUITS: string[] = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Watermelon",
  "Plum",
];

const getRandomFruit = () => FRUITS[Math.floor(Math.random() * FRUITS.length)];

function ListItem({ item, onDelete }: { item: Item; onDelete: () => void }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <li style={styles.listItemWrapper}>
      <div style={styles.listItem}>
        <span style={styles.label}>
          {item.name} (id: {item.id})
        </span>
        <button
          style={{ ...styles.btn, ...styles.infoBtn }}
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? "Hide Info" : "Show Info"}
        </button>
        <button
          style={{ ...styles.btn, ...styles.deleteBtn }}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      {showInfo && (
        <div style={styles.infoBox}>
          Info for <b>{item.name}</b>: This is a delicious fruit! (id: {item.id}
          )
        </div>
      )}
    </li>
  );
}

export default function KeyBugList() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Date" },
  ]);

  const refNextId = useRef(5);

  const addItem = () => {
    items.push({ id: refNextId.current, name: getRandomFruit() });
    setItems(items);
    refNextId.current += 1;
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.wrapper}>
      <h2>List</h2>

      <div style={styles.row}>
        <button style={styles.btn} onClick={addItem}>
          Add Item
        </button>
      </div>

      <ul style={styles.list}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onDelete={() => removeItem(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: 24,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    textAlign: "center",
    maxWidth: 450,
  },
  row: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    marginBottom: 16,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  listItemWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  label: {
    flex: 1,
    textAlign: "left",
    fontSize: 14,
    fontWeight: 500,
  },
  btn: {
    padding: "8px 16px",
    fontSize: 14,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },
  infoBtn: {
    backgroundColor: "#8b5cf6",
    padding: "6px 12px",
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: "6px 12px",
    fontSize: 12,
  },
  infoBox: {
    padding: "8px 12px",
    backgroundColor: "#eff6ff",
    borderRadius: 6,
    fontSize: 13,
    textAlign: "left",
    border: "1px solid #bfdbfe",
  },
};
