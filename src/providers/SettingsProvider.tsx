import { SettingsContext } from "@/context/SettingsContext"
import { getUserAccountSettings, updateSettings } from "@/services/user/user"
import { IToast, IUpdateSettingDto } from "@/types/Settings"
import { IUserWithSettingsData } from "@/types/User"
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"


export const SettingsProvider:FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<IUserWithSettingsData>()
    const [isAcceptedNotification, setAcceptedNotification] = useState<number>(0)
    const [listToasts, setToast] = useState<IToast[]>([])

    const pathname = usePathname()

    const updateField = async (value: IUpdateSettingDto ) => {
        try {
            const user = await updateSettings(value)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    const getSettings = useCallback(async () => {
        try {
          const data = await getUserAccountSettings()
          setData(data)
          console.log(data)
          setAcceptedNotification(data.notifications)
        } catch (error) {
          console.log(error)
        }
       
      },[])

    const showToast = (data: IToast) => {
      setToast(prev => [...prev, data ].slice(-2))
    }

    const removeToast = (id: string) => {
      setToast(prev => prev.filter( val => val.id !== id ) )
    }
      
    useEffect(() => {
        if(pathname.includes('settings')) {
          void getSettings()
        }
      },[pathname])

    return(
        <SettingsContext.Provider value={{
            data,
            listToasts,
            isAcceptedNotification,
            setData,
            showToast,
            removeToast,
            updateField,
            setAcceptedNotification
        }}>
            {children}
        </SettingsContext.Provider>
    )
}
export default SettingsProvider