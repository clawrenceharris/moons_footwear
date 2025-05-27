import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider, NavProvider, ShopProvider } from "./context";
import { HashRouter as BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <NavProvider>
            <ShopProvider>
              <App />
            </ShopProvider>
          </NavProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
