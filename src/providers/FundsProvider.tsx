import { useState, type FC, type PropsWithChildren } from 'react'
import { FundsContext } from '../context/FundsContext'
import { type ISelectedMethod } from '../types/Funds'
import { ERRORS, type TErrors } from '../constants/fundsMethods'
import axios from 'axios'
import { sendCouponCode } from '../services/funds/funds'
import { formatToDecimal } from '../helpers/numberFormater'
import { getPaymentsMethods } from '@/services/payout/payout'
import { PayMethod } from '@/types/Wallet'

export const FundsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [amountInputValue, setAmountInputValue] = useState<string>(() => formatToDecimal('5'))
  const [couponInputValue, setCouponInputValue] = useState<string>('')
  const [addFundsStep, setAddFundsStep] = useState<number>(1)
  const [selectedMethod, setSelectedMethod] = useState<ISelectedMethod>()
  const [couponInfo, setCouponInfo] = useState<number>(0)
  const [errorsState, setErrorsState] = useState<TErrors>(ERRORS)
  const [monthlyLimit, setMonthlyLimit] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [payInMethods, setPayInMethods] = useState<PayMethod[]>([])


  const handleBlurInputAmount = (min: number = 5, max: number = 100) => {
    //clear previous error
    setErrorsState(prev => {
      let copy = { ...prev }
      Object.keys(copy).forEach(key => {
        if (copy[key].relative === 'amount') {
          copy = { ...copy, [key]: { ...copy[key], status: false } }
        }
      })
      return { ...copy }
    })
    if (!amountInputValue || +amountInputValue < min || !Number(amountInputValue)) {
      setErrorsState(prev => ({ ...prev, lowAmount: { ...prev.lowAmount, status: true } }))
      setAmountInputValue(min.toFixed(2))
      return
    }
    if (amountInputValue && (+amountInputValue) > max) {
      setErrorsState(prev => ({ ...prev, lowAmount: { ...prev.excededAmount, status: true } }))
      setAmountInputValue(max.toFixed(2))
      return
    }
    setAmountInputValue(parseFloat(amountInputValue).toFixed(2))
  }

  const handleBlurInputCoupon = async () => {
    setErrorsState(prev => ({ ...prev, wrongCoupon: { ...prev.wrongCoupon, status: false } }))
    if (couponInputValue) {
      setIsLoading(true)
      try {
        await sendCouponCode({ coupon: couponInputValue })
        setCouponInfo(prev => prev + 5)
        setIsLoading(false)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) { setErrorsState(prev => ({ ...prev, wrongCoupon: { ...prev.wrongCoupon, status: true } })) }
        }
      }
    }
  }

  const getAvailablePayInMethods = async () => {
    const methods = await getPaymentsMethods()
    setPayInMethods(methods.filter((method:any) => method.allowedTypes.includes('payin') && method.enabled))
  }
  return (
        <FundsContext.Provider value={{
          addFundsStep,
          selectedMethod,
          amountInputValue,
          couponInputValue,
          couponInfo,
          errorsState,
          monthlyLimit,
          isLoading,
          payInMethods,
          setAddFundsStep,
          setSelectedMethod,
          setAmountInputValue,
          setCouponInputValue,
          setCouponInfo,
          setErrorsState,
          handleBlurInputAmount,
          handleBlurInputCoupon,
          setMonthlyLimit,
          setPayInMethods,
          getAvailablePayInMethods
        }}>
            {children}
        </FundsContext.Provider>
  )
}
