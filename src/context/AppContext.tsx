import { createContext, useContext } from 'react'
import { type IUser } from '../types/User'
import { InitUserState } from '../constants/user'
import { ESteamAppId } from '../types/Inventory'
import { IToast } from '@/types/Settings'
import { EToastType } from '@/types/Enums'

export interface IAppContext {
  getCurrentBalanceAndUpdate: () => Promise<void>
  changeCategoriesState: () => void
  showToast: (message: string, type?: EToastType) => void
  removeToast: (id: string) => void
  categoriesState: boolean
  changeSearchState: () => void
  searchOpened: boolean
  user?: IUser
  userUpdate: (payload: Partial<IUser>) => void
  gameId: ESteamAppId
  updateGameId: (id: ESteamAppId) => void
  isUserLoading: boolean
  listToasts: IToast[]
};

export const AppContext = createContext<IAppContext>({
  categoriesState: false,
  getCurrentBalanceAndUpdate: async () => {},
  changeCategoriesState: () => {},
  changeSearchState: () => {},
  showToast: () => {},
  removeToast: () => {},
  searchOpened: false,
  user: InitUserState,
  userUpdate: () => {},
  gameId: ESteamAppId.CSGO,
  updateGameId: () => {},
  isUserLoading: false,
  listToasts: []
})

export const useAppContext = () => useContext(AppContext)
