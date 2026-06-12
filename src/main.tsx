import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/feral.css";
import "./styles/template-previews.css";
import "./styles/ornaments-page.css";
import "./styles/component-playground.css";
import "./styles/self-labels.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
