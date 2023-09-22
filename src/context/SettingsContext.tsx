import { IUpdateSettingDto } from "@/types/Settings";
import { IUserWithSettingsData } from "@/types/User";
import { Dispatch, SetStateAction, createContext, useContext } from "react";


export interface ISettingsContext {
    data?: IUserWithSettingsData
    isAcceptedNotification: number 
    setData: Dispatch<SetStateAction<IUserWithSettingsData | undefined>>
    updateField: (value: IUpdateSettingDto) => Promise<void>
    setAcceptedNotification:Dispatch<SetStateAction<number>>
}

export const SettingsContext = createContext<ISettingsContext | undefined>(undefined)



export const useSettingsContext = () => {
    const context = useContext(SettingsContext)
    if (!context) {
      throw new Error('useSettings must be used within a SettingstProvider')
    }
    return context
  }