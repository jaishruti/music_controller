import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./Homepage";

export default function App() {
  return (
    <div>
      <h1>Testing React Code</h1>
      <HomePage />
    </div>
  );
}

// const appDiv = document.getElementById("app");
// const root = createRoot(appDiv);
// root.render(<App />);
