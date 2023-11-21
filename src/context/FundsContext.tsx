import { type Dispatch, createContext, useContext } from 'react'
import { type ISelectedMethod } from '../types/Funds'
import { type TErrors } from '../constants/fundsMethods'
import { PayMethod } from '@/types/Wallet'

export interface IFundsContext {
  amountInputValue: string
  couponInputValue: string
  addFundsStep: number
  selectedMethod?: ISelectedMethod
  couponInfo: number
  errorsState: TErrors
  monthlyLimit: number
  isLoading: boolean
  payMethods:PayMethod[]
  setAddFundsStep: Dispatch<React.SetStateAction<number>>
  setSelectedMethod: Dispatch<React.SetStateAction<ISelectedMethod | undefined>>
  setAmountInputValue: Dispatch<React.SetStateAction<string>>
  setCouponInputValue: Dispatch<React.SetStateAction<string>>
  setCouponInfo: Dispatch<React.SetStateAction<number>>
  setErrorsState: Dispatch<React.SetStateAction<TErrors>>
  setMonthlyLimit: Dispatch<React.SetStateAction<number>>
  handleBlurInputAmount: (min: number, max: number) => void
  handleBlurInputCoupon: () => Promise<void>
  setPayMethods: Dispatch<React.SetStateAction<PayMethod[]>>
}

export const FundsContext = createContext<IFundsContext>({
  amountInputValue: '',
  couponInputValue: '',
  addFundsStep: 1,
  selectedMethod: undefined,
  couponInfo: 0,
  errorsState: {},
  monthlyLimit: 0,
  isLoading: false,
  payMethods: [],
  setAddFundsStep: () => {},
  setSelectedMethod: () => {},
  setAmountInputValue: () => {},
  setCouponInputValue: () => {},
  setCouponInfo: () => {},
  setErrorsState: () => {},
  setMonthlyLimit: () => {},
  handleBlurInputAmount: () => {},
  handleBlurInputCoupon: async () => {},
  setPayMethods: () => {}
})

export const useFundsContext = () => useContext(FundsContext)
