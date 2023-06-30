import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './providers/AppProvider'
import { RouterProvider } from "react-router-dom";
import router from './routes';
import './index.css'
import './variables.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
)
