import { SettingsContext } from "@/context/SettingsContext"
import { getUserAccountSettings, updateSettings } from "@/services/user/user"
import { IUpdateSettingDto } from "@/types/Settings"
import { IUserWithSettingsData } from "@/types/User"
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"


export const SettingsProvider:FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<IUserWithSettingsData>()
    const [isAcceptedNotification, setAcceptedNotification] = useState<number>(0)

    const pathname = usePathname()

    const updateField = async (value: IUpdateSettingDto ) => {
        try {
           await updateSettings(value)
        } catch (error) {
            console.log(error)
        }
    }

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
        if(pathname.includes('settings')) {
          void getSettings()
        }
      },[pathname])

    return(
        <SettingsContext.Provider value={{
            data,
            isAcceptedNotification,
            setData,
            updateField,
            setAcceptedNotification
        }}>
            {children}
        </SettingsContext.Provider>
    )
}
export default SettingsProvider