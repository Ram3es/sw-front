import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Panel | Deposit | Skinwallet Instant',
    description: 'Sell your CSGO skins fast and cash out instantly for PayPal, WebMoney. Log in with your Steam, evaluate your inventory, sell skins and send money to your PayPal, WebMoney in 5 minutes.',
  }

  export default function DepositLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        {children}
      </>
    )
  }