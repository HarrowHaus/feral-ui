import "./features/theme-session";
import "./features/color-scheme";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// CSS-LAW: exactly three stylesheets, in cascade order tokens → feral → pages.
// Reordering these imports must produce zero visual change (the cascade is healthy).
import "./styles/tokens.css";
import "./styles/feral.css";
import "./styles/pages.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
