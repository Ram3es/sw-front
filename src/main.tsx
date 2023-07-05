import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './providers/AppProvider'
import { RouterProvider } from "react-router-dom";
import router from './routes';
import './index.css'
import './variables.css'
import PayoutProvider from './providers/PayoutProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <PayoutProvider>
        <RouterProvider router={router} />
      </PayoutProvider>
    </AppProvider>
  </React.StrictMode>,
)
