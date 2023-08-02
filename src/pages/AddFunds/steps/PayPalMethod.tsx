import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as PayPal } from '../../../assets/img/payout/logo-ppcom-white.svg'
import { format, formatToDecimal } from '../../../helpers/numberFormater'
import InformationIcon from '../../../components/icons/InformationIcon'
import InputWithErrors from '../../../components/Content/InputWithErrors'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'
import AddCoupon from '../../../components/funds/AddCoupon'

type TErrors = Record<string, { status: boolean, message?: string, errorClass?: string }>

const ERRORS: TErrors = {
  excededAmount: {
    status: false,
    errorClass: 'flex items gap-2 center text-swOrange text-sm font-normal leading-[14px]',
    message: 'The amount you have entered exceeded the monthly limit. We set the maximum value for you.'
  },
  lowAmount: {
    status: false,
    errorClass: 'flex items gap-2 center text-swOrange text-sm font-normal leading-[14px]',
    message: 'The amount you have entered is below the minimum. We set the minimum value for you.'
  },
  limit: {
    status: false
  }
}

const PayPalMethod = () => {
  const [amountInputValue, setAmountInputValue] = useState<string>(formatToDecimal(500))
  const [errorsState, setErrorsState] = useState<TErrors>(ERRORS)

  const handleChange = (value: string) => {
    setAmountInputValue(value)
  }

  const handleBlur = () => {
    setErrorsState(prev => {
      let copy = { ...prev }
      Object.keys(copy).forEach(key => {
        copy = { ...copy, [key]: { ...copy[key], status: false } }
      })
      return { ...copy }
    })
    if (amountInputValue && ((+amountInputValue) < 5 || !Number(amountInputValue))) {
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
          <div className='flex flex-col '>
              <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>top-up limit</h3>
              <div className='text-graySecondary font-normal '>
                <span className={`${errorsState?.limit.status ? 'text-swOrange' : 'text-white'} font-medium mr-1`}>${format(10000)}</span>
                 left for this month
                 <div className='flex  mt-2' >
                   <InformationIcon iconClasses='w-4 h-4 shrink-0 mr-2 mt-[2px]' />
                  <div className='flex items-center  gap-x-2 text-sm  flex-wrap'>
                      Need more?
                      <Link
                        to='https://www.skinwallet.com/market/kyc-verification'
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
            <InputWithErrors
              value={amountInputValue}
              handleChange={(value: string) => { handleChange(value) }}
              onClear={() => { setAmountInputValue('') } }
              handleBlur={handleBlur}
              error={Object.values(errorsState).filter(obj => obj.status)[0]}
              errorBorder='border-swOrange'
              autoFocus
             />
            <AddCoupon
              amount={ Number(amountInputValue) * 100 || 0 }
            />
            <Button
              text='go to summary'
            //   onClick={setStep}
              className={classNames('bg-skinwalletPink justify-center items-center w-[208px] h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path')}
             />
        </div>
  )
}

export default PayPalMethod
