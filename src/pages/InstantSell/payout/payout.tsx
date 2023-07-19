
import { Nav } from '../controls/nav'
import AmontPayout from './AmontPayout'
import MethodsPayout from './MethodsPayout'
import { usePayoutContext } from '../../../context/PayoutContext'
import SummaryPayout from './SummaryPayout'
import { useCallback, useEffect } from 'react'
import { getPayoutDailyLimits, getPayoutMethods } from '../../../services/payout/payout'
import { IsUserLogged } from '../../../components/IsUserLogged/IsUserLogged'
import { useAppContext } from '../../../context/AppContext'

export const Payout = () => {
  const { userUpdate } = useAppContext()
  const { payoutStep, setPayoutMethods } = usePayoutContext()

  const getAvailableMethodsAndDailyLimit = useCallback(async () => {
    const methods = await getPayoutMethods()
    const { amount: payoutLimit } = await getPayoutDailyLimits()
    userUpdate({ payoutLimit })
    setPayoutMethods(methods)
  }, [])

  useEffect(() => {
    void getAvailableMethodsAndDailyLimit()
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
