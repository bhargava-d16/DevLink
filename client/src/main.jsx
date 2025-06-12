import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-qqtc5sls0yde1uqc.us.auth0.com";
const clientId = "CUMyHVTGuxuyP1joMTsH4GF5G3hMGFHz";

createRoot(document.getElementById('root')).render(
 
    <Auth0Provider
       domain={domain}
       clientId={clientId}
       authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  
)
        
