import React from "react";
import { createRoot } from "react-dom/client";
// import HomePage from "./HomePage";

export default function App() {
  return (
    <div>
      {/* <HomePage /> */}
      <h1>Testing React Code</h1>
    </div>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
