import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import InstantSell from '../pages/InstantSell/InstantSell'
import Payouts from '../pages/Payouts/Payouts'
import TransactionsPage from '../pages/Transactions/Transactions'
import SignIn from '../pages/SignIn/signIn'
import Profile from '../pages/Profile/Profile'
import { Inventory } from '../pages/InstantSell/inventory/inventory'
import { Payout } from '../pages/InstantSell/payout/payout'
import { Bonus } from '../pages/InstantSell/bonus/bonus'
import AmontPayout from '../pages/InstantSell/payout/AmontPayout'
import MethodsPayout from '../pages/InstantSell/payout/MethodsPayout'
import MarketLanding from '../pages/Market/MarketLanding'
import Settings from '../pages/Settings/Settings'
import OnSiteInventory from '../pages/OnSiteInventory/OnSiteInventory'
import AddFunds from '../pages/AddFunds/AddFunds'
import Redeem from '../pages/Reedem/Redeem'
import MarketInventory from '../pages/Market/MarketInventory'
import MarketWithdraw from '../pages/Market/MarketWithdraw'
import ListedItems from '../pages/Market/ListedItems'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'panel',
        children: [
          {
            path: 'deposit',
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
        children: [
          {
            index: true,
            element: <MarketLanding />
          },
          {
            path: 'inventory',
            element: <MarketInventory />,
            children: [
              {
                index: true,
                element: <MarketWithdraw />
              }
            ]
          },
          {
            path: 'withdraw',
            element: <ListedItems />
          }
        ]
      },
      {
        path: 'inventory',
        element: <OnSiteInventory />
      },
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'wallet',
        element: <AddFunds />
      },
      {
        path: '/redeem-item',
        element: <Redeem />
      }
    ]
  }
], { basename: '/' })

export default router
