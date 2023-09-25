'use client'
import SwitchToggle from "@/components/Content/SwitchToggle"
import SettingField from "@/containers/SettingField"
import BillingField from "./components/BillingField"
import SteamSettings from "./components/SteamSettings"
import { useSettingsContext } from "@/context/SettingsContext"
import ErrorLabelRounded from "@/components/funds/ErrorLabelRounded"
import { useRouter, usePathname } from "next/navigation"

export default function Settings() { 
const { push } = useRouter()

const { 
  data,
  isAcceptedNotification,
  updateField,
  setAcceptedNotification
 } = useSettingsContext()

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