import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.tsx";
import { AuthProvider, NavProvider, ShopProvider } from "./context";
import { HashRouter as BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>,
);
