import React, { useState } from "react";

function App() {
  // Step 1: Initialize state
  const [count, setCount] = useState(0);

  // Step 2: Event handlers
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <button onClick={increment} style={{marginRight:"10px", padding:"10px 20px"}}>
        Increment
      </button>
      <button onClick={decrement} style={{padding:"10px 20px"}}>
        Decrement
      </button>
    </div>
  );
}

export default App;