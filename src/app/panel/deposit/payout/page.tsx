"use client"
import { Nav } from "@/components/InstantSellControls/nav"
import { IsUserLogged } from "@/components/IsUserLogged/IsUserLogged"
import AmontPayout from "./AmontPayout"
import MethodsPayout from "./MethodsPayout"
import SummaryPayout from "./SummaryPayout"
import { useAppContext } from "@/context/AppContext"
import { useCallback, useEffect } from "react"
import { getPayoutDailyLimits, getPaymentsMethods } from "@/services/payout/payout"
import { usePayoutContext } from "@/context/PayoutContext"
import { getAllWallets } from "@/services/wallet/wallet"
import ToastManager from "@/containers/ToastManager"


export default function Payout() {
  const { userUpdate } = useAppContext()
  const { payoutStep, setPayoutMethods, setStateMethods } = usePayoutContext()

  const getAvailableMethodsAndDailyLimit = useCallback(async () => {
    const allMethods = await getPaymentsMethods()
    const payoutMethods = allMethods.filter(mth => mth.allowedTypes.includes('payout'))
  
    const { amount: payoutLimit } = await getPayoutDailyLimits()
    userUpdate({ payoutLimit })
    setPayoutMethods(payoutMethods)

    const allWallets = await getAllWallets()
    setStateMethods(payoutMethods.map(method => {
      if(['bitcoin', 'litecoin'].includes(method.name)){
        method = {...method, enabled: false}
      }
      const state = {...method, isSelected: false, isEditMode: false }
      const userWallet = allWallets.find(wallet => wallet.method === method.name)
      if(userWallet){
        return {...state, ...userWallet }
      }
      return state
    }))
  }, [])

  useEffect(() => {
    void getAvailableMethodsAndDailyLimit()
  }, [])
  return (
      <div className='flex flex-col flex-grow py-5'>
        <div className='flex justify-between h-[50px] xl:border-b border-solid border-darkGrey px-0 xl:px-[8px]'>
          <Nav />
        </div>
        <IsUserLogged>
          <div className='px-[24px] py-[30px] '>
          <ToastManager />
            {payoutStep === 'amount'
              ? <AmontPayout />
              : payoutStep === 'method'
                ? <MethodsPayout />
                : <SummaryPayout />
            }
          </div>
        </IsUserLogged>
      </div>
  )
}