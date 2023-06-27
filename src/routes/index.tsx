import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import InstantSell from '../pages/InstantSell/InstantSell';
import Payouts from '../pages/Payouts/Payouts';
import TransactionsPage from '../pages/Transactions/Transactions';
import SignIn from '../pages/SignIn/signIn';
import Profile from '../pages/Profile/Profile';
import Buy from '../pages/Buy/Buy';

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
            element: <div className='text-white'>inventory</div>,
          },
          {
            path: 'payout',
            element: <div className='text-white'>payout</div>,
          },
          {
            path: 'bonus',
            element: <div className='text-white'>bonus</div>,
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