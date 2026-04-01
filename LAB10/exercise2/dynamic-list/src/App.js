import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]); // list of items
  const [input, setInput] = useState(""); // input box value

  // Add new item
  const addItem = () => {
    if (input.trim() !== "") {
      setItems([...items, { id: Date.now(), name: input }]);
      setInput(""); // reset input
    }
  };

  // Remove item
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h1>Dynamic List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem} style={{ marginLeft: "10px" }}>
        Add
      </button>

      {items.length === 0 ? (
        <p>No items in the list</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}{" "}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;