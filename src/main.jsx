import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AD_CLIENT } from './config';

// Expose publisher id to index.html runtime so AdSense script can be loaded with proper client id
if (typeof window !== 'undefined') {
  window.__AD_CLIENT__ = AD_CLIENT;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);