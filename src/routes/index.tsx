import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import InstantSell from '../pages/InstantSell/InstantSell';
import Payouts from '../pages/Payouts/Payouts';
import TransactionsPage from '../pages/Transactions/Transactions';
import SignIn from '../pages/SignIn/signIn';
import Profile from '../pages/Profile/Profile';
import Buy from '../pages/Buy/Buy';
import { Inventory } from '../pages/InstantSell/inventory/inventory'
import { Payout } from '../pages/InstantSell/payout/payout';
import { Bonus } from '../pages/InstantSell/bonus/bonus';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/instant-sell',
        element: <InstantSell />,
        children: [
          {
            index: true,
            element: <Inventory />,
          },
          {
            path: 'payout',
            element: <Payout />,
          },
          {
            path: 'bonus',
            element: <Bonus />,
          },
        ],
      },
      {
        path: 'sign-in',
        element: <SignIn />
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
        path: 'buy',
        element: <Buy />
      },
      {
        path: 'transactions',
        element: <TransactionsPage />
      },
    ]
  },
], { basename: '/market'});

export default router;