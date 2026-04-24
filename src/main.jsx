// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SavedProvider } from "./context/SavedContext";
import { ApplicationProvider } from "./context/ApplicationContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SavedProvider>
      <ApplicationProvider>
        <App />
      </ApplicationProvider>
    </SavedProvider>
  </React.StrictMode>
);