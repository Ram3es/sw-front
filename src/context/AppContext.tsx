import { createContext, useContext } from 'react';

export interface IAppContext {
  changeCategoriesState: () => void;
  categoriesState: boolean;
  changeSearchState: () => void;
  searchOpened: boolean;
  changegameSelectorState: () => void;
  gameSelectorOpened: boolean;
};

export const AppContext = createContext<IAppContext>({
  categoriesState: false,
  changeCategoriesState: () => {},
  changeSearchState: () => {},
  searchOpened: false,
  changegameSelectorState: () => {},
  gameSelectorOpened: false,
});

export const useAppContext = () => useContext(AppContext);