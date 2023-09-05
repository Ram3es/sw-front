import { createContext, useContext } from 'react'
import { type IUser } from '../types/User'
import { InitUserState } from '../constants/user'
import { ESteamAppId } from '../types/Inventory'

export interface IAppContext {
  changeCategoriesState: () => void
  categoriesState: boolean
  changeSearchState: () => void
  searchOpened: boolean
  user?: IUser
  userUpdate: (payload: Partial<IUser>) => void
  gameId: ESteamAppId
  updateGameId: (id: ESteamAppId) => void
  isUserLoading: boolean
};

export const AppContext = createContext<IAppContext>({
  categoriesState: false,
  changeCategoriesState: () => {},
  changeSearchState: () => {},
  searchOpened: false,
  user: InitUserState,
  userUpdate: () => {},
  gameId: ESteamAppId.CSGO,
  updateGameId: () => {},
  isUserLoading: false
})

export const useAppContext = () => useContext(AppContext)
