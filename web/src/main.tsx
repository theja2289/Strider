import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./styles/global.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {import.meta.env.VITE_ROUTER === "hash" ? (
      <HashRouter><App /></HashRouter>
    ) : (
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}><App /></BrowserRouter>
    )}
  </React.StrictMode>,
);
