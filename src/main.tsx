import ReactDOM from 'react-dom/client'
import { AppProvider } from './providers/AppProvider'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import './index.css'
import './variables.css'
import PayoutProvider from './providers/PayoutProvider'
import { FundsProvider } from './providers/FundsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <AppProvider>
      <PayoutProvider>
        <FundsProvider>
          <RouterProvider router={router} />
        </FundsProvider>
      </PayoutProvider>
    </AppProvider>
  // </React.StrictMode>
)
