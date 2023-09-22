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
import ErrorLabelRounded from "@/components/funds/ErrorLabelRounded"
import { useRouter } from "next/navigation"

export default function Settings() { 
const { push } = useRouter()
const { 
  data,
  isAcceptedNotification,
  setData,
  updateField,
  setAcceptedNotification
 } = useSettingsContext()


const getSettings = useCallback(async () => {
  try {
    const data = await getUserAccountSettings()
    setData(data)
    setAcceptedNotification(data.notifications)
  } catch (error) {
    console.log(error)
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
              editableFn={() => { push('settings/email-setup') }}
            >
              { data?.email 
                ? <span className='text-white'>{data.email}</span> 
                : <ErrorLabelRounded
                    message='not provided'
                    isError
                  />
              }  
            </SettingField>
            <BillingField />
            <SettingField
              title='notifications'
            >
              <div className='w-full gap-4 flex items-center '>
                <SwitchToggle
                  checked={Boolean(isAcceptedNotification)}
                  onChange={() => { setAcceptedNotification(val => val ? 0 : 1 ); updateField({ notifications: isAcceptedNotification ? 0 : 1 }) }}
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