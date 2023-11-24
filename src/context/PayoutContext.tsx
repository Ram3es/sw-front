import { type Dispatch, createContext, useContext } from 'react'
import { type TMethodState } from '../types/Payout'
import { PayMethod } from '@/types/Wallet'

export interface IPayoutContext {
  amount: number
  payoutStep: string
  emailPayPal: string
  inputPaypal: string
  methodsState: TMethodState
  availableMethods: PayMethod[]
  setAmount: Dispatch<React.SetStateAction<number>>
  setPayoutStep: Dispatch<React.SetStateAction<string>>
  setPayPalEmail: Dispatch<React.SetStateAction<string>>
  setInputPayPal: Dispatch<React.SetStateAction<string>>
  setPayoutMethods: Dispatch<React.SetStateAction<PayMethod[]>>
  setStateMethods: Dispatch<React.SetStateAction<TMethodState>>

}

export const PayoutContext = createContext<IPayoutContext>({
  amount: 0,
  payoutStep: '',
  emailPayPal: '',
  inputPaypal: '',
  availableMethods: [],
  methodsState: {},
  setAmount: () => {},
  setPayoutStep: () => {},
  setPayPalEmail: () => {},
  setInputPayPal: () => {},
  setPayoutMethods: () => {},
  setStateMethods: () => {}
})

export const usePayoutContext = () => useContext(PayoutContext)
