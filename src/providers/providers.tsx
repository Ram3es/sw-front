'use client';

import { AppProvider } from "./AppProvider";
import { CartProvider } from "./CartProvider";
import { FundsProvider } from "./FundsProvider";
import { MarketOffersProvider } from "./MarketOffersProvider";
import PayoutProvider from "./PayoutProvider";
import SettingsProvider from "./SettingsProvider";

export function Providers({ children } : { children: React.JSX.Element }) {
  return (
    <AppProvider>
      <PayoutProvider>
        <FundsProvider>
          <CartProvider>
            <SettingsProvider>
              <MarketOffersProvider>
                {children}
              </MarketOffersProvider>
            </SettingsProvider>
          </CartProvider>
        </FundsProvider>
      </PayoutProvider>
    </AppProvider>
    );
}