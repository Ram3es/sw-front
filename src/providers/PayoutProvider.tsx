import { FC, PropsWithChildren, useState } from 'react';
import { PayoutContext } from '../context/PayoutContext';


const PayoutProvider:FC<PropsWithChildren> = ({ children }) => {
    const [amount, setAmount] = useState<number>(0)
    const [payoutStep, setPayoutStep] = useState<string>('amount')
    const [emailPayPal, setPayPalEmail] = useState('')
    const [inputPaypal, setInputPayPal] = useState('')
    return (
        <PayoutContext.Provider value={{
            amount,
            payoutStep,
            emailPayPal,
            inputPaypal,
            setAmount,
            setPayoutStep,
            setPayPalEmail,
            setInputPayPal
        }}>
            {children}
        </PayoutContext.Provider>
    );
};

export default PayoutProvider;