import { useCallback, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { type IUser } from '../types/User'
import { getUser } from '../services/user/user'
import { ESteamAppId } from '../types/Inventory'

interface IProps {
  children: React.JSX.Element
}

export const AppProvider = ({ children }: IProps) => {
  const [categoriesState, setCategoriesState] = useState(false)
  const [searchOpened, setSearchOpened] = useState(false)
  const [gameId, setGameId] = useState<ESteamAppId>(ESteamAppId.CSGO)
  const [user, setUser] = useState<IUser>()

  const getUserApp = useCallback(async () => {
    try {
      const data = await getUser()
      setUser({ id: data.steamId, username: data.steamUsername, balance: Number(data.balance) })
    } catch (error) {
      console.log(error, 'app provider')
    }
  }, [])

  useEffect(() => {
    void getUserApp()
  }, [])

  const changeCategoriesState = () => { setCategoriesState(!categoriesState) }
  const changeSearchState = () => { setSearchOpened(!searchOpened) }
  const userUpdate = (user: IUser) => { setUser(user) }
  const updateGameId = (id: ESteamAppId) => { setGameId(id) }

  return (
    <AppContext.Provider
      value={{
        changeCategoriesState,
        categoriesState,
        changeSearchState,
        searchOpened,
        user,
        userUpdate,
        gameId,
        updateGameId
      }}
    >
      { children }
    </AppContext.Provider>
  )
}
