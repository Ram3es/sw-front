'use client'
import Bar from "@/components/Bar/Bar"
import NavBar from "./components/NavBar"
import { useAppContext } from "@/context/AppContext"
import SwitchToggle from "@/components/Content/SwitchToggle"
import { useCallback, useEffect, useState } from "react"
import SettingField from "@/containers/SettingField"
import BillingField from "./components/BillingField"
import SteamSettings from "./components/SteamSettings"
import { getUserAccountSettings } from "@/services/user/user"
import { useSettingsContext } from "@/context/SettingsContext"

export default function Settings() { 
const [isAcceptedNotification, setAcceptedNotification] = useState(false)

const { user } = useAppContext()
const { data, setData } = useSettingsContext()


const getSettings = useCallback(async () => {
  try {
    const data = await getUserAccountSettings()
    setData(data)
  } catch (error) {
    console.log(error, 'errrrooooorr')
  }
 
},[])

useEffect(() => {
  void getSettings()
},[])


return (
      <div className='w-full py-16 px-6'>
        <div className='w-full max-w-[672px] flex flex-col gap-8 mx-auto '>
          <div className='flex flex-col gap-4'>
            <SettingField
              title='e-mail'
              editableFn={() => { console.log('nav to email page') }}
            >
              <span className='text-white'>{data?.steamId}</span>
            </SettingField>
            <BillingField />
            <SettingField
              title='notifications'
            >
              <div className='w-full gap-4 flex items-center '>
                <SwitchToggle
                  checked={isAcceptedNotification}
                  onChange={() => { setAcceptedNotification(boolean => !boolean) }}
                 />
                <span className='text-sm font-normal'>I agree to receive e-mail newsletters from Skinwallet</span>
              </div>
            </SettingField>
          </div>
          <div className=' w-full border-b border-darkGrey' />
          <SteamSettings/>
        </div>
      </div>
)
}