import { type Dispatch, createContext, useContext } from 'react'

export interface IPayoutContext {
  amount: number
  payoutStep: string
  emailPayPal: string
  inputPaypal: string
  setAmount: Dispatch<React.SetStateAction<number>>
  setPayoutStep: Dispatch<React.SetStateAction<string>>
  setPayPalEmail: Dispatch<React.SetStateAction<string>>
  setInputPayPal: Dispatch<React.SetStateAction<string>>

}

export const PayoutContext = createContext<IPayoutContext>({
  amount: 0,
  payoutStep: '',
  emailPayPal: '',
  inputPaypal: '',
  setAmount: () => {},
  setPayoutStep: () => {},
  setPayPalEmail: () => {},
  setInputPayPal: () => {}
})

export const usePayoutContext = () => useContext(PayoutContext)
