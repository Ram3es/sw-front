import { format } from '../../../helpers/numberFormater'

const MethodFee = ({ topUpFee }: { topUpFee: string }) => {
  return (
        <div className='flex flex-col gap-3 mt-5'>
            <div className='flex flex-col'>
                <span className='text-xs leading-3 font-normal text-graySecondary' >Min. top-up amount </span>
                <span className='text-sm text-white' >${format(500)}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-xs leading-3 font-normal text-graySecondary' >Top-up fee</span>
                <span className='text-sm text-white' >{topUpFee}</span>
            </div>

        </div>
  )
}

export default MethodFee
