import { useState } from 'react';
import { AppContext } from '../context/AppContext';
import { IUser } from '../types/User';
import { InitUserState } from '../constants/user';

type IProps = {
  children: React.JSX.Element,
}

export const AppProvider = ({ children }: IProps) => {
  const [ categoriesState, setCategoriesState ] = useState(false);
  const [ searchOpened, setSearchOpened ] = useState(false);
  const [ gameSelectorOpened, setGameSelectorOpened ] = useState(false);
  const [ user, setUser ] = useState<IUser>()

  const changeCategoriesState = () => setCategoriesState(!categoriesState);
  const changeSearchState = () => setSearchOpened(!searchOpened);
  const changegameSelectorState = () => setGameSelectorOpened(!gameSelectorOpened);
  const userUpdate = (user: IUser) => setUser(user)

  return (
    <AppContext.Provider
      value={{
        changeCategoriesState,
        categoriesState,
        changeSearchState,
        searchOpened,
        changegameSelectorState,
        gameSelectorOpened,
        user,
        userUpdate
      }}
    >
      { children }
    </AppContext.Provider>
  );
}