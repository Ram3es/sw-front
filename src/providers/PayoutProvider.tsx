import { type FC, type PropsWithChildren, useState } from 'react'
import { PayoutContext } from '../context/PayoutContext'

const PayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [amount, setAmount] = useState<number>(0)
  const [payoutStep, setPayoutStep] = useState<string>('amount')
  const [emailPayPal, setPayPalEmail] = useState('')
  const [inputPaypal, setInputPayPal] = useState('')
  const [payoutMethods, setPayoutMethods] = useState<Record<string, any>>({})
  return (
        <PayoutContext.Provider value={{
          amount,
          payoutStep,
          emailPayPal,
          inputPaypal,
          payoutMethods,
          setAmount,
          setPayoutStep,
          setPayPalEmail,
          setInputPayPal,
          setPayoutMethods
        }}>
            {children}
        </PayoutContext.Provider>
  )
}

export default PayoutProvider
