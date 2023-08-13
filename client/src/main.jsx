import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ColumnProvider } from "./store/context.jsx";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ColumnProvider>
      <App />
    </ColumnProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
