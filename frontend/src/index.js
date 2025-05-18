import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx"; // Ensure this path matches your actual file structure

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Ensure your HTML file has an element with id="root"
);
