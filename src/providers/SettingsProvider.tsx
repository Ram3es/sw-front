import { SettingsContext } from "@/context/SettingsContext"
import { getUserAccountSettings, updateSettings } from "@/services/user/user"
import { IUpdateSettingDto } from "@/types/Settings"
import { IUserWithSettingsData } from "@/types/User"
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react"


export const SettingsProvider:FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<IUserWithSettingsData>()
    const [isAcceptedNotification, setAcceptedNotification] = useState<number>(0)

    const updateField = async (value: IUpdateSettingDto ) => {
        try {
            const user = await updateSettings(value)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }


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