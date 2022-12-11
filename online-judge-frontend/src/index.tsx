import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BackendHealthCheckContext } from "./modules/BackendHealthCheck/contexts/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BackendHealthCheckContext.Provider value={{ isBackendHealthy: false }}>
      <App />
    </BackendHealthCheckContext.Provider>
  </React.StrictMode>
);
