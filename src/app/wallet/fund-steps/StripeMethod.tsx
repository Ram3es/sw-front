import { useEffect } from 'react'
import Link from 'next/link'
import { format } from '../../../helpers/numberFormater'
import InformationIcon from '../../../components/icons/InformationIcon'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'
import AddCoupon from '../../../components/funds/coupon/AddCoupon'
import { useFundsContext } from '../../../context/FundsContext'
import ErrorLabelRounded from '../../../components/funds/ErrorLabelRounded'
import ArrowRight from '@/components/icons/ArrowRight'
import InputWithErrors from '@/components/Content/InputWithErrors'
import Mark from '@/components/icons/wallet/Mark'
import { PayMethod } from '@/types/Wallet'

const StripeMethod = () => {
  const {
    amountInputValue,
    errorsState,
    selectedMethod,
    payInMethods,
    setAmountInputValue,
    setAddFundsStep,
    setErrorsState,
    handleBlurInputAmount
  } = useFundsContext()

  const method = payInMethods.find(method => method.name === selectedMethod?.methodName) as PayMethod

  const handleChange = (value: string) => {
    if(value.length > 7) return
    setAmountInputValue(value)
  }

  const goToSummary = () => { 
    if(amountInputValue) {
      if (method && (+amountInputValue) <= method.max / 100) {
        setAddFundsStep(5) 
        setErrorsState( prev => {
          let copy = {...prev}
            Object.keys(copy).forEach(key => {
            if(copy[key].relative === 'amount'){
              copy = {...copy, [key]: {...copy[key], status: false}}
            }
          })
          return copy
        })
      } else if (method) {
        setAmountInputValue((method.max / 100).toString())
      }
    }
  }

  useEffect(() => {
    setErrorsState(prev => ({ ...prev, limit: { ...prev.excededAmount, status: false } }))
    if (amountInputValue && method && (+amountInputValue) >= method.max) {
      setErrorsState(prev => ({ ...prev, limit: { ...prev.excededAmount, status: true } }))
    }
  }, [amountInputValue])

  return (
        <div className='w-full text-white flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>step 2/2</h3>
              <h2 className='uppercase tracking-[1.28px]'>fill top-up amount</h2>
            </div>
            <span className='uppercase'>{method.name}</span>
            {/* <LogoPayPal /> */}
          </div>
          <ErrorLabelRounded
            isError={errorsState.excededMonthly.status}
            message={errorsState.excededMonthly.message}
           />
          <div className='flex flex-col '>
              <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>top-up range</h3>
              <div className='text-graySecondary font-normal '>
                <span className={`${errorsState?.limit.status ? 'text-swOrange' : 'text-white'} font-medium mr-1`}>{`$${format(method.min)}  -  $${format(method.max)}`}</span>
                 <div className='flex  mt-2' >
                   <InformationIcon iconClasses='w-4 h-4 shrink-0 mr-2 mt-[2px]' />
                  <div className='flex items-center  gap-x-2 text-sm  flex-wrap'>
                      Need more?
                      <Link
                        href='https://www.skinwallet.com/market/kyc-verification'
                        className={`${errorsState?.limit.status ? 'text-swOrange' : 'text-white'} underline hover:no-underline -mx-1`}
                        >
                        Complete KYC procedure
                      </Link>
                      and unlock the
                      <span className='text-white -mx-1'>${(9000).toLocaleString('en-US')}</span>
                      monthly limit!
                  </div>
                 </div>
              </div>
            </div>
            <div className={errorsState.excededMonthly.status ? 'pointer-events-none opacity-50' : '' } >
            <InputWithErrors
              value={amountInputValue}
              handleChange={handleChange}
              onClear={() => { setAmountInputValue('') } }
              handleBlur={() => handleBlurInputAmount(method.min/100, method.max/100)}
              successIcon={<Mark className='w-4 h-[18px] text-swLime' />}
              error={Object.values(errorsState).filter(obj => obj.status && obj.relative === 'amount')[0]}
              errorBorder='border-swOrange'
              autoFocus={!errorsState.excededMonthly.status}
              variant='amount'
              withClearBtn
             />
             </div>
             {errorsState.excededMonthly.status
               ? <div
                 onClick={() => { setAddFundsStep(1) }}
                 className='flex items-center gap-2 text-graySecondary hover:text-white duration-200  cursor-pointer'>
                  <ArrowRight className='h-6 w-auto rotate-180  ' />
                  <span className='uppercase tracking-[1.28px]'>back to wallet</span>
               </div>
               : null }

            <Button
              text='go to summary'
              onClick={goToSummary}
              className={classNames('bg-skinwalletPink justify-center items-center w-[208px] h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                errorsState.excededMonthly.status ? 'pointer-events-none grayscale opacity-50' : '')}
             />
        </div>
  )
}

export default StripeMethod
