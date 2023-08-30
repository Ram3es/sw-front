'use client';

import { AppProvider } from "./AppProvider";
import { FundsProvider } from "./FundsProvider";
import PayoutProvider from "./PayoutProvider";

export function Providers({ children } : { children: React.JSX.Element }) {
  return (
    <AppProvider>
      <PayoutProvider>
        <FundsProvider>
          {children}
        </FundsProvider>
      </PayoutProvider>
    </AppProvider>
    );
}