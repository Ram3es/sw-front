import { IToast, IUpdateSettingDto } from "@/types/Settings";
import { IUserWithSettingsData } from "@/types/User";
import { Dispatch, SetStateAction, createContext, useContext } from "react";


export interface ISettingsContext {
    data?: IUserWithSettingsData
    listToasts: IToast[]
    isAcceptedNotification: number 
    removeToast: (id: string) => void
    setData: Dispatch<SetStateAction<IUserWithSettingsData | undefined>>
    showToast: (data:IToast) => void
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