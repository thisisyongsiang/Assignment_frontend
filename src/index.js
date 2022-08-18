import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Auth0Provider
    domain="dev-kf8a74jj.us.auth0.com"
    clientId="P7PjNRviAForgi4GTFUSnbcfWDNJf6Lr"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,);
