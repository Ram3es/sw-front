import { useState } from 'react';
import { AppContext } from '../context/AppContext';

type IProps = {
  children: React.JSX.Element,
}

export const AppProvider = ({ children }: IProps) => {
  const [ categoriesState, setCategoriesState ] = useState(false);
  const [ searchOpened, setSearchOpened ] = useState(false);
  const [ gameSelectorOpened, setGameSelectorOpened ] = useState(false);

  const changeCategoriesState = () => setCategoriesState(!categoriesState);
  const changeSearchState = () => setSearchOpened(!searchOpened);
  const changegameSelectorState = () => setGameSelectorOpened(!gameSelectorOpened);

  return (
    <AppContext.Provider
      value={{
        changeCategoriesState,
        categoriesState,
        changeSearchState,
        searchOpened,
        changegameSelectorState,
        gameSelectorOpened,
      }}
    >
      { children }
    </AppContext.Provider>
  );
}