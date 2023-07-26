import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import InstantSell from '../pages/InstantSell/InstantSell'
import Payouts from '../pages/Payouts/Payouts'
import TransactionsPage from '../pages/Transactions/Transactions'
import SignIn from '../pages/SignIn/signIn'
import Profile from '../pages/Profile/Profile'
import Buy from '../pages/Buy/Buy'
import { Inventory } from '../pages/InstantSell/inventory/inventory'
import { Payout } from '../pages/InstantSell/payout/payout'
import { Bonus } from '../pages/InstantSell/bonus/bonus'
import AmontPayout from '../pages/InstantSell/payout/AmontPayout'
import MethodsPayout from '../pages/InstantSell/payout/MethodsPayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'panel',
        children: [
          {
            path: 'instant-sell',
            element: <InstantSell />,
            children: [
              {
                index: true,
                element: <Inventory />
              },
              {
                path: 'payout',
                element: <Payout />,
                children: [
                  {
                    index: true,
                    element: <AmontPayout />
                  },
                  {
                    path: 'method',
                    element: <MethodsPayout />
                  }
                ]
              },
              {
                path: 'bonus',
                element: <Bonus />
              }
            ]
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'payout',
            element: <Payouts />
          },
          {
            path: 'transactions',
            element: <TransactionsPage />
          }
        ]
      },
      {
        path: 'market',
        element: <Buy />
      },
      {
        path: 'sign-in',
        element: <SignIn />
      }
    ]
  }
], { basename: '/' })

export default router
