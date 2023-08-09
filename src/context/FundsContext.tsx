import { type Dispatch, createContext, useContext } from 'react'
import { type ISelectedMethod } from '../types/Funds'
import { type TErrors } from '../constants/fundsMethods'

export interface IFundsContext {
  amountInputValue: string
  couponInputValue: string
  addFundsStep: number
  selectedMethod?: ISelectedMethod
  couponInfo: number
  errorsState: TErrors
  monthlyLimit: number
  isLoading: boolean
  setAddFundsStep: Dispatch<React.SetStateAction<number>>
  setSelectedMethod: Dispatch<React.SetStateAction<ISelectedMethod | undefined>>
  setAmountInputValue: Dispatch<React.SetStateAction<string>>
  setCouponInputValue: Dispatch<React.SetStateAction<string>>
  setCouponInfo: Dispatch<React.SetStateAction<number>>
  setErrorsState: Dispatch<React.SetStateAction<TErrors>>
  setMonthlyLimit: Dispatch<React.SetStateAction<number>>
  handleBlurInputAmount: () => void
  handleBlurInputCoupon: () => Promise<void>
}

export const FundsContext = createContext<IFundsContext>({
  amountInputValue: '',
  couponInputValue: '',
  addFundsStep: 0,
  selectedMethod: undefined,
  couponInfo: 0,
  errorsState: {},
  monthlyLimit: 0,
  isLoading: false,
  setAddFundsStep: () => {},
  setSelectedMethod: () => {},
  setAmountInputValue: () => {},
  setCouponInputValue: () => {},
  setCouponInfo: () => {},
  setErrorsState: () => {},
  setMonthlyLimit: () => {},
  handleBlurInputAmount: () => {},
  handleBlurInputCoupon: async () => {}

})

export const useFundsContext = () => useContext(FundsContext)
