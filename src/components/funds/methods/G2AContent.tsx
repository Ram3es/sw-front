import MethodFee from './MethodFee'
import { format } from '../../../helpers/numberFormater'
import { ReactComponent as WebMoney } from '../../../assets/img/payout/logo-webmoney.svg'
import { ReactComponent as Trustly } from '../../../assets/img/funds/logo-trustly.svg'
import { ReactComponent as Neteller } from '../../../assets/img/funds/logo-neteller.svg'

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
                <WebMoney />
                <Trustly />
                <Neteller />
            </div>
        </div>
  )
}

export default G2AContent
