import { type Dispatch, createContext, useContext } from 'react'

export interface IPayoutContext {
  amount: number
  payoutStep: string
  emailPayPal: string
  inputPaypal: string
  payoutMethods: Record<string, any>
  setAmount: Dispatch<React.SetStateAction<number>>
  setPayoutStep: Dispatch<React.SetStateAction<string>>
  setPayPalEmail: Dispatch<React.SetStateAction<string>>
  setInputPayPal: Dispatch<React.SetStateAction<string>>
  setPayoutMethods: Dispatch<React.SetStateAction<Record<string, any>>>

}

export const PayoutContext = createContext<IPayoutContext>({
  amount: 0,
  payoutStep: '',
  emailPayPal: '',
  inputPaypal: '',
  payoutMethods: {},
  setAmount: () => {},
  setPayoutStep: () => {},
  setPayPalEmail: () => {},
  setInputPayPal: () => {},
  setPayoutMethods: () => {}
})

export const usePayoutContext = () => useContext(PayoutContext)
