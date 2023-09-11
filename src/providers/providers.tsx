'use client';

import { AppProvider } from "./AppProvider";
import { CartProvider } from "./CartProvider";
import { FundsProvider } from "./FundsProvider";
import PayoutProvider from "./PayoutProvider";

export function Providers({ children } : { children: React.JSX.Element }) {
  return (
    <AppProvider>
      <PayoutProvider>
        <FundsProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </FundsProvider>
      </PayoutProvider>
    </AppProvider>
    );
}