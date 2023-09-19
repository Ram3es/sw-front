import { IUserWithSettingsData } from "@/types/User";
import { Dispatch, SetStateAction, createContext, useContext } from "react";


export interface ISettingsContext {
    data?: IUserWithSettingsData 
    setData: Dispatch<SetStateAction<IUserWithSettingsData | undefined>>
}

export const SettingsContext = createContext<ISettingsContext | undefined>(undefined)



export const useSettingsContext = () => {
    const context = useContext(SettingsContext)
    if (!context) {
      throw new Error('useSettings must be used within a SettingstProvider')
    }
    return context
  }