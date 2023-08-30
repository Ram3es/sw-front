import { useEffect } from 'react'
import Link from 'next/link
import { ReactComponent as PayPal } from '../../../assets/img/payout/logo-ppcom-white.svg'
import { format } from '../../../helpers/numberFormater'
import InformationIcon from '../../../components/icons/InformationIcon'
import InputWithErrors from '../../../components/Content/InputWithErrors'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'
import AddCoupon from '../../../components/funds/coupon/AddCoupon'
import { useFundsContext } from '../../../context/FundsContext'
import ErrorLabelRounded from '../../../components/funds/ErrorLabelRounded'
import { ReactComponent as Arrow } from '../../../assets/img/market/arrow-right.svg'

const PayPalMethod = () => {
  const {
    amountInputValue,
    errorsState,
    monthlyLimit,
    setAmountInputValue,
    setAddFundsStep,
    setErrorsState,
    handleBlurInputAmount
  } = useFundsContext()

  useEffect(() => {
    setErrorsState(prev => ({ ...prev, limit: { ...prev.excededAmount, status: false } }))
    if (amountInputValue && (+amountInputValue) >= 100) {
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
            <PayPal />
          </div>
          <ErrorLabelRounded
            isError={errorsState.excededMonthly.status}
            message={errorsState.excededMonthly.message}
           />
          <div className='flex flex-col '>
              <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>top-up limit</h3>
              <div className='text-graySecondary font-normal '>
                <span className={`${errorsState?.limit.status ? 'text-swOrange' : 'text-white'} font-medium mr-1`}>${format(monthlyLimit)}</span>
                 left for this month
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
              handleChange={(value: string) => { setAmountInputValue(value) }}
              onClear={() => { setAmountInputValue('') } }
              handleBlur={handleBlurInputAmount}
              error={Object.values(errorsState).filter(obj => obj.status && obj.relative === 'amount')[0]}
              errorBorder='border-swOrange'
              autoFocus={!errorsState.excededMonthly.status}
             />
             </div>
             {errorsState.excededMonthly.status
               ? <div
                 onClick={() => { setAddFundsStep(1) }}
                 className='flex items-center gap-2 text-graySecondary hover:text-white duration-200  cursor-pointer'>
                  <Arrow className='h-6 w-auto rotate-180  ' />
                  <span className='uppercase tracking-[1.28px]'>back to wallet</span>
               </div>
               : <AddCoupon /> }

            <Button
              text='go to summary'
              onClick={() => { setAddFundsStep(5) }}
              className={classNames('bg-skinwalletPink justify-center items-center w-[208px] h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                errorsState.excededMonthly.status ? 'pointer-events-none grayscale opacity-50' : '')}
             />
        </div>
  )
}

export default PayPalMethod
