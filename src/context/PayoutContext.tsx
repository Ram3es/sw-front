import { type Dispatch, createContext, useContext } from 'react'
import { type TMethodState } from '../types/Payout'

export interface IPayoutContext {
  amount: number
  payoutStep: string
  emailPayPal: string
  inputPaypal: string
  methodsState: TMethodState
  availableMethods: Record<string, any>
  setAmount: Dispatch<React.SetStateAction<number>>
  setPayoutStep: Dispatch<React.SetStateAction<string>>
  setPayPalEmail: Dispatch<React.SetStateAction<string>>
  setInputPayPal: Dispatch<React.SetStateAction<string>>
  setPayoutMethods: Dispatch<React.SetStateAction<Record<string, any>>>
  setSelecteMethod: Dispatch<React.SetStateAction<TMethodState>>

}

export const PayoutContext = createContext<IPayoutContext>({
  amount: 0,
  payoutStep: '',
  emailPayPal: '',
  inputPaypal: '',
  availableMethods: {},
  methodsState: {},
  setAmount: () => {},
  setPayoutStep: () => {},
  setPayPalEmail: () => {},
  setInputPayPal: () => {},
  setPayoutMethods: () => {},
  setSelecteMethod: () => {}
})

export const usePayoutContext = () => useContext(PayoutContext)
