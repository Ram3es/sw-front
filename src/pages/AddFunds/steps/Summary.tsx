import { useState } from 'react'
import RoundedMark from '../../../components/icons/RoundedMark'
import { Link } from 'react-router-dom'
import { useFundsContext } from '../../../context/FundsContext'
import EditPencil from '../../../components/icons/EditPencil'
import { format } from '../../../helpers/numberFormater'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'
import CouponLabel from '../../../components/funds/coupon/CouponLabel'
import { ReactComponent as CloseIcon } from '../../../assets/close-icon.svg'
import InputWithErrors from '../../../components/Content/InputWithErrors'

const Summary = () => {
  const [isEditAmount, setIsEditAmount] = useState(false)
  const [isEditCoupon, setIsEditCoupon] = useState(false)
  const {
    amountInputValue,
    couponInputValue,
    couponInfo,
    selectedMethod,
    errorsState,
    setAddFundsStep,
    setAmountInputValue,
    setCouponInputValue,
    setCouponInfo,
    handleBlurInputAmount,
    handleBlurInputCoupon
  } = useFundsContext()

  return (
    <div className='w-full flex justify-center  pt-6 sm:py-12 '>
        <div className='w-full max-w-[1024px] flex flex-col sm:flex-row  sm:gap-8 '>
          <div className='w-full h-[500px] sm:h-auto max-w-[672px] flex flex-col gap-4 px-6 sm:px-0 text-white overflow-scroll'>
            <div className='w-full flex items-start px-6 py-4 bg-darkGrey relative'>
              <div className='w-1/3 flex items-center gap-2'>
                <RoundedMark className='text-swLime w-[18px] h-auto ' />
                <span className='text-lg text-graySecondary uppercase tracking-[1.44px]' >method</span>
              </div>
              <div className='flex flex-col text-sm font-normal text-graySecondary'>
                <h3 className='text-white text-lg font-medium mb-4'>{selectedMethod?.title}</h3>
                <div className='flex flex-col gap-4 mb-2 max-w-[388px] [&>p>span]:text-white [&>p>span]:font-medium '>
                  <p>Make sure you have a
                    <span> verified PayPal account</span>, otherwise your payment won’t be accepted.
                    <Link
                      to={'/'}
                      className='text-skinwalletPink font-medium underline hover:no-underline ml-1'
                    >
                      Read how to perform the verification process.
                    </Link>
                  </p>
                  <p>Only the payments from
                    <span> verified accounts </span>
                    will be accepted. Transfer verification
                    <span> may take longer </span> than usual.
                  </p>
                  <p>You will be redirected to Conotoxia Pay website, where you can finish the transaction.</p>
                   </div>
              </div>
              <div
                onClick={() => { setAddFundsStep(1) } }
                className='absolute top-4 right-6 text-graySecondary group cursor-pointer '
                >
                 <EditPencil className='group-hover:text-white duration-200' />
              </div>
            </div>
            {isEditAmount
              ? (
                <InputWithErrors
                  value={amountInputValue}
                  handleChange={(value: string) => { setAmountInputValue(value) }}
                  onClear={() => { setAmountInputValue('') } }
                  handleBlur={handleBlurInputAmount}
                  error={Object.values(errorsState).filter(obj => obj.status && obj.relative === 'amount')[0]}
                  errorBorder='border-swOrange'
                  autoFocus
               />
                )
              : (
                 <div className='w-full flex flex-col sm:flex-row items-start px-6 py-4 bg-darkGrey relative'>
                  <div className='w-full sm:w-1/3 flex items-center gap-2'>
                    <RoundedMark className='text-swLime w-[18px] h-auto ' />
                    <span className='text-lg text-graySecondary uppercase tracking-[1.44px]' >amount</span>
                  </div>
                  <div className='w-full sm:w-2/3 flex items-center justify-between'>
                    <span className='text-lg text-white'>${amountInputValue}</span>
                    <div
                      onClick={() => { setIsEditAmount(true) } }
                      className='text-graySecondary group cursor-pointer '
                    >
                      <EditPencil className='group-hover:text-white duration-200 ' />
                    </div>
                  </div>
                </div>)
            }
            { couponInfo || isEditCoupon
              ? !isEditCoupon
                  ? (
                <div className='w-full flex flex-col sm:flex-row items-start px-6 py-4 bg-darkGrey relative'>
                <div className='w-full sm:w-1/3 flex items-center gap-2'>
                  <RoundedMark className='text-swLime w-[18px] h-auto' />
                  <span className='text-lg text-graySecondary uppercase tracking-[1.44px]' >coupon code</span>
                </div>
                <div className='w-full sm:w-2/3 flex items-center justify-between'>
                  <span className='text-lg text-white'>Awesome 2000 code</span>
                  <div className='flex items-center gap-4'>
                    <div
                      onClick={() => { setIsEditCoupon(true) } }
                      className='text-graySecondary group cursor-pointer '
                    >
                      <EditPencil className='group-hover:text-white duration-200 ' />
                    </div>
                    <div
                      onClick={() => { setCouponInfo(0); setCouponInputValue('') }}
                      className='text-graySecondary hover:text-white duration-200 cursor-pointer'
                    >
                      <CloseIcon className='w-3 h-[18px] ' />
                    </div>
                  </div>
                </div>
              </div>
                    )
                  : (
                    <InputWithErrors
                      label='coupon code'
                      value={couponInputValue}
                      handleChange={(value) => { setCouponInputValue(value) }}
                      onClear={() => { setCouponInputValue('') }}
                      handleBlur={() => { void handleBlurInputCoupon() }}
                      errorBorder='border-swRed'
                      error={errorsState.wrongCoupon}
                      autoFocus
                      variant='coupon'
                    />
                    )
              : <CouponLabel submitFn={() => { setIsEditCoupon(true) }} />}
          </div>
          <div className=' h-max w-full sm:w-[320px] text-graySecondary bg-darkGrey p-6 sm:cta-clip-path'>
            <div className='w-full '>
              <div className='flex flex-col gap-2'>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>amount</div>
                  <span className='text-white'>${format(Number(amountInputValue) * 100 || 0)}</span>
                </div>
                {!!couponInfo &&
                  <div className='flex flex-col gap-2 pb-6 mb-4 border-b border-white/10'>
                    <div className='w-full flex justify-between items-center text-sm '>
                      <div className='uppercase tracking-[1.12px]'>active coupon</div>
                      <span className='text-swLime'>+${format(couponInfo)}</span>
                    </div>
                    <div className='w-full flex justify-between items-center text-sm '>
                      <div className='uppercase tracking-[1.12px]'>final top-up</div>
                      <span >${format(couponInfo + (Number(amountInputValue) * 100 || 0))}</span>
                    </div>
                  </div>
                    }
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>payment fee</div>
                  <span className=''>${format(0)}</span>
                </div>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>total payment</div>
                  <span className=' text-2xl leading-6  text-white '>${format(Number(amountInputValue) * 100 || 0)}</span>
                </div>
              </div>
            </div>
            <Button
              text='proceed payment'
              onClick={() => {}}
              className={classNames('bg-skinwalletPink justify-center items-center w-full h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                selectedMethod?.methodName ? '' : 'pointer-events-none grayscale opacity-50')}
             />
          </div>
        </div>
      </div>
  )
}

export default Summary
