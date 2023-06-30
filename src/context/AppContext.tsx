import { createContext, useContext } from 'react';

export interface IAppContext {
  changeCategoriesState: () => void;
  categoriesState: boolean;
  changeSearchState: () => void;
  searchOpened: boolean;
  changegameSelectorState: () => void;
  gameSelectorOpened: boolean;
  user: boolean;
  userUpdate: () => void;
};

export const AppContext = createContext<IAppContext>({
  categoriesState: false,
  changeCategoriesState: () => {},
  changeSearchState: () => {},
  searchOpened: false,
  changegameSelectorState: () => {},
  gameSelectorOpened: false,
  user: false,
  userUpdate: () => {}
});

export const useAppContext = () => useContext(AppContext);