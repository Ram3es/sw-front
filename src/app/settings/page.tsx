'use client'
import SwitchToggle from "@/components/Content/SwitchToggle"
import SettingField from "@/containers/SettingField"
import BillingField from "./components/BillingField"
import SteamSettings from "./components/SteamSettings"
import { useSettingsContext } from "@/context/SettingsContext"
import ErrorLabelRounded from "@/components/funds/ErrorLabelRounded"
import { useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

export default function Settings() { 
const { push } = useRouter()

const { 
  data,
  isAcceptedNotification,
  updateField,
  showToast,
  setAcceptedNotification
 } = useSettingsContext()

 const toggleSwitcher = useCallback(async () => {
  setAcceptedNotification(val => val ? 0 : 1 )
  try {
    await updateField({ notifications: isAcceptedNotification ? 0 : 1 })
    showToast({
      id: `notification-${Date.now().toString()}`,
      message: 'Setting was applied',
      type: "success"
    })

  } catch (error) {
    showToast({
      id: `notification-error-${Date.now().toString()}`,
      message: 'Error occurred',
      type: "error"
    })
  }
   
 }, [isAcceptedNotification])

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
                  onChange={toggleSwitcher}
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