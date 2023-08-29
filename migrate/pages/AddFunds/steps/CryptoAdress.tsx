
import { ReactComponent as Bitcoin } from '../../../assets/img/funds/rounded-bitcoin.svg'
import QRCode from '../../../assets/img/funds/mock-QR-code.png'
import CopyIcon from '../../../components/icons/CopyIcon'
import InformationIcon from '../../../components/icons/InformationIcon'
import { format } from '../../../helpers/numberFormater'
import AddCoupon from '../../../components/funds/coupon/AddCoupon'

const CryptoAdress = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>step 3/4</h3>
          <h2 className='uppercase tracking-[1.28px] text-white '>TOP-UP WITH {'BITCOIN'}</h2>
        </div>
        <Bitcoin />
      </div>
      <div className='flex flex-row w-full py-8 px-6 bg-dark-14 '>
        <img src={QRCode} alt='qr-code' className='mr-6 hidden sm:block' />
        <div className='w-full sm:w-[calc(100%_-_134px)] flex flex-col gap-3'>
          <span className='text-lg text-graySecondary uppercase leading-[18px] tracking-[1.44px]' >DEPOSIT ADDRESS</span>
          <div className='w-full h-14 flex items-center justify-between px-5 bg-darkGrey '>
            <div className='text-white truncate w-full pr-4' >38wmw4uou2bWPEw4USzunSHdA9t7JhfvHXd</div>
            <div className='text-graySecondary hover:text-white duration-200 cursor-pointer'>
                <CopyIcon className='w-5 h-auto ' />
            </div>
          </div>
          <div className='flex items-center gap-2 text-graySecondary '>
            <InformationIcon iconClasses='w-4 h-4 shrink-0 ' />
            <span className='text-sm leading-[14px] font-normal' >Only send BTC to the address above, 1 confirmation(s) required.</span>
          </div>
        </div>
      </div>
      <div className='w-max flex items-center gap-6 text-white'>
        <div>
            <span className='text-xs text-graySecondary font-normal block'>USD amount</span>
            <span className='block'>${format(500)}</span>
        </div>
        <span>=</span>
        <div>
            <span className='text-xs text-graySecondary font-normal block'>Bitcoin amount</span>
            <span className='block'>0.12598032098</span>
        </div>
      </div>
      <AddCoupon />
  </div>
  )
}

export default CryptoAdress
