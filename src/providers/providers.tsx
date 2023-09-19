'use client';

import { AppProvider } from "./AppProvider";
import { CartProvider } from "./CartProvider";
import { FundsProvider } from "./FundsProvider";
import PayoutProvider from "./PayoutProvider";
import SettingsProvider from "./SettingsProvider";

export function Providers({ children } : { children: React.JSX.Element }) {
  return (
    <AppProvider>
      <PayoutProvider>
        <FundsProvider>
          <CartProvider>
            <SettingsProvider>
              {children}
            </SettingsProvider>
          </CartProvider>
        </FundsProvider>
      </PayoutProvider>
    </AppProvider>
    );
}