import React, { useMemo, useState, useEffect } from 'react'
import PaperPayout from './PaperPayout'
import { useAppContext } from '@/context/AppContext'
import { usePayoutContext } from '@/context/PayoutContext'
import { REGEX } from '@/constants/regex'
import { convertToBacks, format } from '@/helpers/numberFormater'
import { Button } from '@/components/Navigation'
import ExclamationStarIcon from '@/components/icons/ExclamationStarIcon'
import ExclamationTriangleFilled from '@/components/icons/ExclamationTriangleFilled'
import { classNames } from '@/helpers/className'
import Checkbox from '@/components/Content/Checkbox'
import ClockIcon from '@/components/icons/ClockIcon'
import InputWithBtn from '@/components/Content/InputWithBtn'
import Link from 'next/link'
import { setWallet } from '@/services/user/user'
import { useSettingsContext } from '@/context/SettingsContext'
import { EPaymentMethod } from '@/types/Wallet'
import { createPayout } from '@/services/wallet/wallet'
import { PAYOUT_METHODS } from '@/constants/payout-methods'

const MethodsPayout = () => {
  const [isAcceptedPolicy, setIsAcceptedPolicy] = useState(false)
  const [isCryptoErr, setIsCryptoErr] = useState(false)

  const {
    amount,
    methodsState,
    setStateMethods,
    setPayoutStep,
    setFeeByMethod
  } = usePayoutContext()

  const { showToast } = useSettingsContext()

  const [selectedMethod] = useMemo(() => methodsState.filter(method => method.isSelected), [methodsState])
  const fee = useMemo(() => {
    if(selectedMethod) {
      const fixedFee = selectedMethod.fee
      const percentage = selectedMethod.feePercentage
      const totalFee = Math.ceil(amount * percentage + fixedFee)
      return totalFee
    }
    return 0
    
  }, [selectedMethod, amount])

  const isExceededLimit = useMemo(() => {
    if( selectedMethod && (selectedMethod.min > (amount - fee) || selectedMethod.max < (amount - fee))){
      return true
    }
    return false

  },[selectedMethod,fee,amount])

  const handleSetMethodRequirments = async (method: string, inputValue: string) => {
    console.log(method, 'method')
    switch (method) {
      case 'venmo':
        if (!REGEX.phoneOrName.test(inputValue)) {
          showToast({
            id: `${Date.now().toString()}`,
            type: 'error',
            message:'Incorrect format phone number'
          })
        }
        break
      case 'paypal':
        if (!REGEX.email.test(inputValue)) {
           showToast({
            id: `${Date.now().toString()}`,
            type: 'error',
            message:'Incorrect Email'
          })
        }
        break
      case 'bitcoin':
        if (!REGEX.bitcoin.test(inputValue)) {
           showToast({
            id: `${Date.now().toString()}`,
            type: 'error',
            message:'Incorrect Wallet Address'
          })
        }
        break
      case 'ethereum':
        if (!REGEX.ethereum.test(inputValue)) {
            showToast({
            id: `${Date.now().toString()}`,
            type: 'error',
            message:'Incorrect Wallet Address'
          })
        }
        break
    }

    try {
      await setWallet({
        id: selectedMethod.id,
        currency: selectedMethod.name,
        wallet: inputValue
       })
      setStateMethods(prev => [...prev.map(meth => {
        if(meth.name === method){
          return {...meth, walletAddress: inputValue, isEditMode: false  }
        }
        return meth
      })])
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const radioChange = (method: string) => {
    setStateMethods(prev => [...prev.map(mth => {
      if(mth.name === method){
        return {...mth, isSelected: true}
      }
      return {...mth, isSelected: false}
    })])

  }
  const handleSubmit = async () => {
    try {
      await createPayout({ 
        amount: amount - fee,
        balanceAmount: amount,
        method: selectedMethod.name,
        walletAddress: selectedMethod.walletAddress as string 
      })
      setFeeByMethod(fee)
      setPayoutStep('summary')
    } catch (error) {
      showToast({
        id: `${Date.now().toString()}`,
        type: 'error',
        message:'Something went wrong'
      })
    }
   
  }

  useEffect(() => {
    if (convertToBacks(amount) < 50) {
      setIsCryptoErr(true)
      return
    }
    setIsCryptoErr(false)
  }, [amount, methodsState])

  return (
        <div className='flex flex-col items-center mx-auto max-w-[472px]  '>
            <div className='w-full flex items-center justify-between pb-4  font-medium tracking-widest text-sm text-white'>
                <div className='flex flex-col'>
                    <h6 className='uppercase'>payout amount</h6>
                    <span className='text-swLime text-22 leading-6 font-semibold'>${format(amount)}</span>
                </div>
                <div className='relative overflow-hidden hover:brightness-125 button'>
                    <Button
                        text='CHANGE'
                        onClick={() => { setPayoutStep('amount') }}
                        className='w-[130px] justify-center text-graySecondary font-semibold border border-graySecondary cta-clip-path '
                    />
                    <div className=' w-4 absolute -left-1 bottom-1  border-b border-graySecondary rotate-45' />
                </div>

            </div>
           <PaperPayout title='Choose payment provider'>
                <div className='flex flex-col'>
                    <div className='w-full flex items-center gap-2 px-2 py-1 text-sm text-darkSecondary font-normal bg-swLightYellow'>
                        <ExclamationStarIcon />
                        <span>0% fee for wire transfers in USD!</span>
                    </div>
                    {methodsState.map((method, idx) =>
                        <React.Fragment key={method.name}>
                            {idx === 2 && isCryptoErr &&
                                <div className='w-full flex items-center gap-2 px-2 py-1 text-sm text-darkSecondary font-normal bg-yellow-1e '>
                                    <ExclamationTriangleFilled />
                                    Minimum payout amount is $50.00
                                </div>}
                            <div
                                className={classNames('flex flex-col mb-2  text-swLime bg-gray-29 cta-clip-path',
                                  selectedMethod?.name === method.name ? 'border-2 border-swLime' : '',
                                  method.enabled  ? '' : 'opacity-30 grayscale pointer-events-none')}
                            >
                                <div className='flex items-center justify-between p-4'>
                                    <div
                                      className='flex items-center gap-4 cursor-pointer'
                                      onClick={() => { radioChange(method.name) }}
                                    >
                                        <Checkbox
                                            checked={method.isSelected}
                                            activeClass=''
                                            additionalClasses='bg-gray-40 border-none pointer-events-none shrink-0'
                                        />
                                        {PAYOUT_METHODS[method.name]?.logo}
                                    </div>

                                    <div className={classNames('flex items-center gap-1.5 text-xs sm:text-sm ',
                                      idx % 3 ? 'text-graySecondary' : '')}>
                                        <ClockIcon />
                                        {PAYOUT_METHODS[method.name]?.timeline}
                                    </div>
                                </div>
                                {selectedMethod?.name === method.name &&
                                    <div>
                                        { !selectedMethod.walletAddress || selectedMethod.isEditMode
                                          ? <div className='flex flex-col'>
                                            <InputWithBtn
                                              placeholder={PAYOUT_METHODS[method.name]?.placeholder}
                                              walletAddress={selectedMethod?.walletAddress}
                                              submitFn={(inputValue: string) => { handleSetMethodRequirments(method.name, inputValue) }}
                                              autoFocus
                                               />
                                            </div>
                                          : <div className=" flex items-center justify-between  pb-4 sm:pb-8 px-4 sm:px-0 sm:pr-4 sm:pl-12 text-white">
                                                <div className="flex flex-col w-2/3">
                                                    <p className="text-graySecondary">{PAYOUT_METHODS[method.name]?.methodTitle}</p>
                                                    <p className="text-base truncate">{method.walletAddress}</p>

                                                </div>
                                                <div className='relative overflow-hidden hover button'>
                                                    <Button
                                                        text='edit'
                                                        onClick={() => {
                                                          setStateMethods(prev => [...prev.map(mth => {
                                                            if(mth.name === selectedMethod.name){
                                                              return {...mth, isEditMode: true}
                                                            }
                                                            return mth
                                                          })])
                                                        }}
                                                        className='justify-center text-graySecondary w-20 sm:w-28 font-semibold border uppercase border-graySecondary cta-clip-path '
                                                    />
                                                    <div className=' w-4 absolute -left-1 bottom-1  border-b border-graySecondary rotate-45' />
                                                </div>
                                            </div>
                                        }
                                         <div className=' flex flex-col sm:flex-row  justify-between text-11 py-2 px-4 text-dark-14 bg-swLime'>
                                            <div className='flex items-center gap-2 '>
                                                <ExclamationTriangleFilled  />
                                                <div className='flex flex-col'>
                                                  <p>Range payout amount:</p>
                                                  <span> ${format(selectedMethod.min)} - ${format(selectedMethod.max)}</span>
                                                </div>
                                            </div>
                                            <p>Provider may take additional free.</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </React.Fragment>
                    )}
                    <div className='flex gap-3 items-end mt-8'>
                        <div className='text-darkSecondary ' >
                            <Checkbox checked={isAcceptedPolicy} onChange={(boolean) => { setIsAcceptedPolicy(boolean) }} />
                        </div>
                        <p className='text-xs sm:text-sm font-normal'>
                            I agree to the {''}
                            <Link
                                href={''}
                                className='text-swLime underline hover:text-swLime/90'
                            >
                                Terms of Service
                            </Link> and {''}
                            <Link
                                href={''}
                                className='text-swLime underline  hover:text-swLime/90'
                            >
                                Privacy Policy
                            </Link>.
                        </p>
                    </div>
                    <div className='h-12 mt-4'>
                        <Button
                            text={selectedMethod ? `process payout [$${format(amount- fee)}]` : 'select a payment method'}
                            onClick={() => { void handleSubmit() }}
                            className={classNames('w-full h-full flex justify-center bg-swLime text-darkSecondary cta-clip-path tracking-widest uppercase text-17 sm:text-21 font-medium hover small-caps',
                              isAcceptedPolicy 
                              && !selectedMethod?.isEditMode 
                              && selectedMethod?.walletAddress 
                              && !isExceededLimit
                              && !(isCryptoErr && selectedMethod.name === EPaymentMethod.Cashapp) 
                                ? '' 
                                : 'pointer-events-none opacity-50 grayscale')}
                        />
                    </div>

                </div>
           </PaperPayout>
        </div>
  )
}

export default MethodsPayout
