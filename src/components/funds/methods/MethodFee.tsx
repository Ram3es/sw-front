import { IMethodContentProps } from '@/constants/fundsMethods'
import { format } from '../../../helpers/numberFormater'

const MethodFee = ({ value }: { value?: IMethodContentProps }) => {
  return (
        <div className='flex flex-col gap-3 mt-5'>
            <div className='flex flex-col'>
                <span className='text-xs leading-3 font-normal text-graySecondary' >Top-up range amount </span>
                <span className='text-sm text-white' >{value?.limit}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-xs leading-3 font-normal text-graySecondary' >Top-up fee</span>
                <span className='text-sm text-white' >{value?.fee}</span>
            </div>

        </div>
  )
}

export default MethodFee
