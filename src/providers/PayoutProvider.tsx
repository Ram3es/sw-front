import { type FC, type PropsWithChildren, useState } from 'react'
import { PayoutContext } from '../context/PayoutContext'
import { PAYOUT_METHODS } from '../constants/payout-methods'
import { type TMethodState } from '../types/Payout'
import { PayMethod } from '@/types/Wallet'

const PayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [amount, setAmount] = useState<number>(0)
  const [payoutStep, setPayoutStep] = useState<string>('amount')
  const [emailPayPal, setPayPalEmail] = useState('')
  const [inputPaypal, setInputPayPal] = useState('')
  const [availableMethods, setPayoutMethods] = useState<PayMethod[]>([])
  const [methodsState, setStateMethods] = useState<TMethodState>({})
  return (
        <PayoutContext.Provider value={{
          amount,
          payoutStep,
          emailPayPal,
          inputPaypal,
          methodsState,
          availableMethods,
          setAmount,
          setPayoutStep,
          setPayPalEmail,
          setInputPayPal,
          setPayoutMethods,
          setStateMethods
        }}>
            {children}
        </PayoutContext.Provider>
  )
}

export default PayoutProvider
