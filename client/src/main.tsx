import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider
import Home from "./routes/Home";
import "./index.css";
import Landing from "./routes/Landing";

// Auth0 configuration (replace these with your own values from the Auth0 dashboard)
const domain = "dev-cu6cl376vgb1h4vt.us.auth0.com";
const clientId = "KktsDhjl32lxQjOUG8mfI4qPhIvGaB7Z";
const redirectUri = window.location.origin;

const router = createBrowserRouter([
  {
    path: "/app",
    element: <Home />,
  },
  {
    path: "/",
    element: <Landing />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>
);
