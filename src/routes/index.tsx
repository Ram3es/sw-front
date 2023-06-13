import { createBrowserRouter } from 'react-router-dom';
import SellPage from '../pages/SellPage/SellPage';
import Payouts from '../pages/Payouts/Payouts';
import TransactionsPage from '../pages/Transactions/Transactions';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'sell',
        element: <SellPage />
      },
      {
        path: 'payouts',
        element: <Payouts />
      },
      {
        path: 'transactions',
        element: <TransactionsPage />
      },
    ]
  },
]);

export default router;