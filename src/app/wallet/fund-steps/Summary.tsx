import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RoundedMark from '../../../components/icons/RoundedMark'
import { useFundsContext } from '../../../context/FundsContext'
import EditPencil from '../../../components/icons/EditPencil'
import { convertToCents, format, formatToDecimal } from '../../../helpers/numberFormater'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'
import { ImportantNotice, NoticeContent } from '../../../components/funds/ImportantNotice'
import InputWithErrors from '@/components/Content/InputWithErrors'
import Mark from '@/components/icons/wallet/Mark'
import { createPayin } from '@/services/wallet/wallet'
import { EPaymentMethod, PayMethod } from '@/types/Wallet'
import { REGEX } from '@/constants/regex'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'



const Summary = () => {
  const [isEditAmount, setIsEditAmount] = useState(false)
  const { replace } = useRouter()
  const { showToast } = useAppContext()
  const {
    amountInputValue,
    couponInfo,
    selectedMethod,
    payInMethods,
    errorsState,
    setAddFundsStep,
    setAmountInputValue,
    handleBlurInputAmount,
  } = useFundsContext()

  const method = payInMethods.find(method => method.name === selectedMethod?.methodName) as PayMethod
  const fee = Math.ceil(convertToCents(+amountInputValue) * method.feePercentage + method.fee)
  const amountTrx = Math.ceil(convertToCents(+amountInputValue) + fee)

  const payinSubmit = async () => {
    try {
      const created = await createPayin({
        method: selectedMethod?.methodName as EPaymentMethod,
        amount: amountTrx,
        balanceAmount: convertToCents(+amountInputValue)
      })
      replace(created.url)
    } catch (error) {
      if(axios.isAxiosError(error)){
        const message = error?.response?.data?.message
        showToast(message)
      }
    }
    
  }

  const handleChange = (value: string) => {
    if(value.length > 7 || !REGEX.inputNumber.test(value)) return
    setAmountInputValue(value)
  }


  return (
    <div className='w-full flex flex-grow justify-center pt-6 sm:py-12 '>
        <div className='w-full h-[calc(100vh_-_234px)] sm:h-full max-w-[1024px] flex flex-col justify-between sm:flex-row sm:gap-8 '>
          <div className='w-full  h-full max-w-[672px] flex flex-col gap-4 pb-10 px-6 sm:px-0 text-white overflow-y-scroll relative '>
            <div className='w-full flex flex-col gap-y-3 sm:flex-row items-start px-6 py-4 bg-darkGrey relative'>
              <div className='w-full sm:w-1/3 flex items-center gap-2'>
                <RoundedMark className='text-swLime w-[18px] h-auto shrink-0 ' />
                <span className='text-lg text-graySecondary uppercase tracking-[1.44px]' >method</span>
              </div>
              <div className='flex flex-col text-sm font-normal text-graySecondary'>
                <h3 className='text-white text-lg font-medium mb-4'>{selectedMethod?.title}</h3>
                <NoticeContent className='hidden sm:flex' />
                <ImportantNotice className='sm:hidden' />
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
                  handleChange={handleChange}
                  onClear={() => { setAmountInputValue('') } }
                  handleBlur={() => handleBlurInputAmount(method.min/100, method.max/100)}
                  successIcon={<Mark className='w-4 h-[18px] text-swLime' />}
                  error={Object.values(errorsState).filter(obj => obj.status && obj.relative === 'amount')[0]}
                  errorBorder='border-swOrange'
                  autoFocus
                  variant='amount'
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
          </div>
          <div className=' h-max w-full sm:w-[320px] text-graySecondary bg-darkGrey p-6 sm:cta-clip-path relative'>
            <div className='w-full '>
              <div className='flex flex-col gap-2'>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>amount</div>
                  <span className='text-white'>${formatToDecimal(parseFloat(amountInputValue).toFixed(2))}</span>
                </div>
                {!!couponInfo &&
                  <div className='flex flex-col gap-2 pb-6 mb-4 border-b border-white/10'>
                    <div className='w-full flex justify-between items-center text-sm '>
                      <div className='uppercase tracking-[1.12px]'>active coupon</div>
                      <span className='text-swLime'>+${formatToDecimal(couponInfo.toString())}</span>
                    </div>
                    <div className='w-full flex justify-between items-center text-sm '>
                      <div className='uppercase tracking-[1.12px]'>final top-up</div>
                      <span >${formatToDecimal((couponInfo + +amountInputValue).toString())}</span>
                    </div>
                  </div>
                    }
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>payment fee</div>
                  <span className=''>${format(fee)}</span>
                </div>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>total payment</div>
                  <span className=' text-2xl leading-6  text-white '>${format(amountTrx)}</span>
                </div>
              </div>
            </div>
            <Button
              text='proceed payment'
              onClick={payinSubmit}
              className={classNames('bg-skinwalletPink justify-center items-center w-full h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                selectedMethod?.methodName ? '' : 'pointer-events-none grayscale opacity-50')}
             />
             <div className='w-full absolute left-0 -top-10 h-10 sm:hidden' style={{ background: 'linear-gradient(180deg, rgba(20, 20, 21, 0.00) 0%, #0D0D0D 100%)' }}/>
          </div>
        </div>
      </div>
  )
}

export default Summary
