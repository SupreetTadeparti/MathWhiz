import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";

// Auth0 configuration (replace these with your own values from the Auth0 dashboard)
const domain = "dev-cu6cl376vgb1h4vt.us.auth0.com";
const clientId = "KktsDhjl32lxQjOUG8mfI4qPhIvGaB7Z";
const redirectUri = window.location.origin;


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
