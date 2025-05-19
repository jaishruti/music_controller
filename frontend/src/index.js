import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx"; // Ensure this path matches your actual file structure
import { createRoot } from "react-dom/client";

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);