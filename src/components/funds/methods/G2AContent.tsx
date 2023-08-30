import MethodFee from './MethodFee'
import { format } from '../../../helpers/numberFormater'
import Image from 'next/image'

const G2AContent = () => {
  return (
        <div className='flex justify-between'>
            <div className=' flex flex-col gap-2'>
              <MethodFee topUpFee={`2% + $${format(40)}`} />
              <div className='flex flex-col'>
                <span className='text-xs leading-3 font-normal text-graySecondary' >Methods available</span>
                <span className='text-sm text-white' >25+</span>
            </div>
            </div>
            <div className='flex flex-col gap-4 mt-4 items-end'>
              <Image
                width={112}
                height={27}
                src="/img/payout/logo-webmoney.svg"
                alt="logo-webmoney"
              />
              <Image
                width={114}
                height={25}
                src="/img/funds/logo-trustly.svg"
                alt="logo-webmoney"
              />
              <Image
                width={105}
                height={19}
                src="/img/funds/logo-neteller.svg"
                alt="logo-webmoney"
              />
            </div>
        </div>
  )
}

export default G2AContent
