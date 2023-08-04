import { useState, type FC, type PropsWithChildren, useEffect } from 'react'
import { FundsContext } from '../context/FundsContext'
import { type ISelectedMethod } from '../types/Funds'
import { formatToDecimal } from '../helpers/numberFormater'
import { ERRORS, type TErrors } from '../constants/fundsMethods'
// import { sendCouponCode } from '../services/funds/funds'
import axios from 'axios'

export const FundsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [amountInputValue, setAmountInputValue] = useState<string>(formatToDecimal(500))
  const [couponInputValue, setCouponInputValue] = useState<string>('')
  const [addFundsStep, setAddFundsStep] = useState<number>(1)
  const [selectedMethod, setSelectedMethod] = useState<ISelectedMethod>()
  const [couponInfo, setCouponInfo] = useState<number>(0)
  const [errorsState, setErrorsState] = useState<TErrors>(ERRORS)
  const [monthlyLimit, setMonthlyLimit] = useState(0)

  const handleBlurInputAmount = () => {
    setErrorsState(prev => {
      let copy = { ...prev }
      Object.keys(copy).forEach(key => {
        if (copy[key].relative === 'amount') {
          copy = { ...copy, [key]: { ...copy[key], status: false } }
        }
      })
      return { ...copy }
    })
    if (!amountInputValue || +amountInputValue < 5 || !Number(amountInputValue)) {
      setErrorsState(prev => ({ ...prev, lowAmount: { ...prev.lowAmount, status: true } }))
      setAmountInputValue(parseFloat('5').toFixed(2))
      return
    }
    if (amountInputValue && (+amountInputValue) > 100) {
      setErrorsState(prev => ({ ...prev, lowAmount: { ...prev.excededAmount, status: true } }))
      setAmountInputValue(parseFloat('100').toFixed(2))
      return
    }
    setAmountInputValue(parseFloat(amountInputValue).toFixed(2))
  }

  const handleBlurInputCoupon = async () => {
    setErrorsState(prev => ({ ...prev, wrongCoupon: { ...prev.wrongCoupon, status: false } }))
    try {
      // const data = couponInputValue && await sendCouponCode({ coupon: couponInputValue })
      setCouponInfo(prev => prev + 500)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) { setErrorsState(prev => ({ ...prev, wrongCoupon: { ...prev.wrongCoupon, status: true } })) }
      }
    }
  }

  useEffect(() => {
    // getMonthlyLimit
    const data: number = 10000
    if (data === 0) {
      setErrorsState(prev => ({ ...prev, excededMonthly: { ...prev.excededMonthly, status: true } }))
      return
    }
    setMonthlyLimit(data)
  }
  , [])
  return (
        <FundsContext.Provider value={{
          addFundsStep,
          selectedMethod,
          amountInputValue,
          couponInputValue,
          couponInfo,
          errorsState,
          monthlyLimit,
          setAddFundsStep,
          setSelectedMethod,
          setAmountInputValue,
          setCouponInputValue,
          setCouponInfo,
          setErrorsState,
          handleBlurInputAmount,
          handleBlurInputCoupon,
          setMonthlyLimit

        }}>
            {children}
        </FundsContext.Provider>
  )
}
