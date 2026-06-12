import "./features/theme-session";
import "./features/scheme-session";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/feral.css";
import "./styles/dark-mode.css";
import "./styles/template-previews.css";
import "./styles/ornaments-page.css";
import "./styles/component-playground.css";
import "./styles/self-labels.css";
import "./styles/mobile-nav-fix.css";
import "./styles/night-role-repair.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
