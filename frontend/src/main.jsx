import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { UnitsProvider } from './context/UnitsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UnitsProvider>
        <App />
      </UnitsProvider>
    </AuthProvider>
  </StrictMode>,
)