
import { Nav } from '../controls/nav'
import AmontPayout from './AmontPayout'
import MethodsPayout from './MethodsPayout'
import { usePayoutContext } from '../../../context/PayoutContext'
import SummaryPayout from './SummaryPayout'

export const Payout = () => {
  const { payoutStep } = usePayoutContext()
  return (
    <>
      <div className='flex flex-col flex-grow py-5'>
        <div className='flex justify-between h-[50px] border-b border-solid border-darkGrey px-[8px]'>
          <Nav />
        </div>
        <div className='px-[24px] py-[30px] '>
          {payoutStep === 'amount'
            ? <AmontPayout />
            : payoutStep === 'method'
              ? <MethodsPayout />
              : <SummaryPayout />
          }

        </div>
      </div>
    </>
  )
}
