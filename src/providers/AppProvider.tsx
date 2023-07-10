import { useCallback, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { type IUser } from '../types/User'
import { getUser } from '../services/user.service'

interface IProps {
  children: React.JSX.Element
}

export const AppProvider = ({ children }: IProps) => {
  const [categoriesState, setCategoriesState] = useState(false)
  const [searchOpened, setSearchOpened] = useState(false)
  const [gameSelectorOpened, setGameSelectorOpened] = useState(false)
  const [user, setUser] = useState<IUser>()

  const getUserApp = useCallback(async () => {
    try {
      const data = await getUser()
      console.log(data, 'user data')
    } catch (error) {
      console.log(error, 'app provider')
    }
  }, [])

  useEffect(() => {
    void getUserApp()
  }, [])

  const changeCategoriesState = () => { setCategoriesState(!categoriesState) }
  const changeSearchState = () => { setSearchOpened(!searchOpened) }
  const changegameSelectorState = () => { setGameSelectorOpened(!gameSelectorOpened) }
  const userUpdate = (user: IUser) => { setUser(user) }

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
  )
}
