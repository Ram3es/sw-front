import { createContext, useContext } from 'react'
import { type IUser } from '../types/User'
import { InitUserState } from '../constants/user'

export interface IAppContext {
  changeCategoriesState: () => void
  categoriesState: boolean
  changeSearchState: () => void
  searchOpened: boolean
  changegameSelectorState: () => void
  gameSelectorOpened: boolean
  user?: IUser
  userUpdate: (user: IUser) => void
};

export const AppContext = createContext<IAppContext>({
  categoriesState: false,
  changeCategoriesState: () => {},
  changeSearchState: () => {},
  searchOpened: false,
  changegameSelectorState: () => {},
  gameSelectorOpened: false,
  user: InitUserState,
  userUpdate: () => {}
})

export const useAppContext = () => useContext(AppContext)
