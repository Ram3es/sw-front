
import { Nav } from '../controls/nav'
import AmontPayout from './AmontPayout'
import MethodsPayout from './MethodsPayout'
import { usePayoutContext } from '../../../context/PayoutContext'
import SummaryPayout from './SummaryPayout'
import { useCallback, useEffect } from 'react'
import { getPayoutMethods } from '../../../services/payout/payout'
import { IsUserLogged } from '../../../components/IsUserLogged/IsUserLogged'

export const Payout = () => {
  const { payoutStep, setPayoutMethods } = usePayoutContext()

  const getAvailableMethods = useCallback(async () => {
    const methods = await getPayoutMethods()
    setPayoutMethods(methods)
  }, [])

  useEffect(() => {
    void getAvailableMethods()
  }, [])
  return (
    <>
      <div className='flex flex-col flex-grow py-5'>
        <div className='flex justify-between h-[50px] border-b border-solid border-darkGrey px-[8px]'>
          <Nav />
        </div>
        <IsUserLogged>
          <div className='px-[24px] py-[30px] '>
            {payoutStep === 'amount'
              ? <AmontPayout />
              : payoutStep === 'method'
                ? <MethodsPayout />
                : <SummaryPayout />
            }
          </div>
        </IsUserLogged>

      </div>
    </>
  )
}
