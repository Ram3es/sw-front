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
  userUpdate: (user: IUser) => void
  gameId: ESteamAppId
  updateGameId: (id: ESteamAppId) => void
};

export const AppContext = createContext<IAppContext>({
  categoriesState: false,
  changeCategoriesState: () => {},
  changeSearchState: () => {},
  searchOpened: false,
  user: InitUserState,
  userUpdate: () => {},
  gameId: ESteamAppId.CSGO,
  updateGameId: () => {}
})

export const useAppContext = () => useContext(AppContext)
