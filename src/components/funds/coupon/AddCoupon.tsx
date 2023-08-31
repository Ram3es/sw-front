
import Dropbox from '../../Content/Dropbox'
import { SOCIAL_LINKS } from '../../../constants/sidebar-links'
import { formatToDecimal } from '../../../helpers/numberFormater'
import InputWithErrors from '../../Content/InputWithErrors'
import { useFundsContext } from '../../../context/FundsContext'
import Link from 'next/link'

const AddCoupon = () => {
  const {
    couponInfo,
    couponInputValue,
    amountInputValue,
    errorsState,
    isLoading,
    setCouponInputValue,
    handleBlurInputCoupon
  } = useFundsContext()

  return (
    <Dropbox
    label='add coupon code'
    additionalClasses='w-max flex items-center gap-2 uppercase text-graySecondary text-sm  tracking-[1.12px] hover:text-white duration-200 cursor-pointer'
    >
    <div className='flex flex-col gap-6 mt-4 text-graySecondary ' >
      <InputWithErrors
        label='coupon code'
        value={couponInputValue}
        handleChange={(value) => { setCouponInputValue(value) }}
        onClear={() => { setCouponInputValue('') }}
        handleBlur={() => { void handleBlurInputCoupon() }}
        errorBorder='border-swRed'
        error={errorsState.wrongCoupon}
        isLoading={isLoading}
        variant='coupon'
        />
      <div className='w-full flex flex-col sm:flex-row gap-6 pb-6 border-b border-darkGrey'>
        <div className=' w-full sm:w-1/2 text-sm font-normal px-0 sm:px-2' >{'Follow us on social media and join our mailing list to make sure you won\'t miss any codes in the future!'}</div>
        <div className=' w-full sm:w-1/2'>
          <div className="flex flex-col gap-3">
            <div className="font-Barlow text-xs uppercase text-graySecondary">
              Follow us
            </div>
            <div className="flex items-center gap-y-2 gap-x-4 flex-wrap text-graySecondary">
              {SOCIAL_LINKS.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className='hover:text-white duration-200'
                >
                  {item.icon}
                </Link>
              ))}
            </div>
         </div>
        </div>
      </div>
      <div className='w-full border-b border-darkGrey '>
        <div className='sm:ml-auto w-full sm:w-1/2 pl-3 py-6'>
          <div className='flex flex-col gap-2'>
            <div className='w-full flex justify-between items-center text-sm '>
              <div className='uppercase tracking-[1.12px]'>amount</div>
              <span className='text-white'>${formatToDecimal(amountInputValue)}</span>
            </div>
            <div className='w-full flex justify-between items-center text-sm '>
              <div className='uppercase tracking-[1.12px]'>active coupon</div>
              <span className={couponInfo ? 'text-swLime' : ''}>+${formatToDecimal(couponInfo.toString())}</span>
            </div>
            <div className='w-full flex justify-between items-center text-sm '>
              <div className='uppercase tracking-[1.12px]'>final top-up</div>
              <span className=' text-2xl leading-6  text-white '>${formatToDecimal((+amountInputValue + couponInfo).toString())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dropbox>
  )
}

export default AddCoupon
