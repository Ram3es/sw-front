import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from '../src/providers/AppProvider'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './index.css'
import './variables.css'
import PayoutProvider from '../src/providers/PayoutProvider'
import { FundsProvider } from '../src/providers/FundsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <PayoutProvider>
        <FundsProvider>
          <RouterProvider router={router} />
        </FundsProvider>
      </PayoutProvider>
    </AppProvider>
  </React.StrictMode>
)
