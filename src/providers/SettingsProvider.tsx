import { SettingsContext } from "@/context/SettingsContext"
import { getUserAccountSettings } from "@/services/user/user"
import { IUserWithSettingsData } from "@/types/User"
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react"


export const SettingsProvider:FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<IUserWithSettingsData>()
    return(
        <SettingsContext.Provider value={{
            data,
            setData
        }}>
            {children}
        </SettingsContext.Provider>
    )
}
export default SettingsProvider