import React from "react";
import { Container, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root") as Container;

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
