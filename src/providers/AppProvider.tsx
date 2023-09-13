'use client'
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
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true)

  const getUserApp = useCallback(async () => {
    setIsUserLoading(true)
    try {
      const data = await getUser()
      setUser({
        id: data.steamId,
        username: data.steamUsername,
        balance: Number(data.balance),
        avatar: data.avatarUrl,
        billingAddress: data.billingAddress
      })
      setIsUserLoading(false)
    } catch (error) {
      console.log(error, 'app provider')
      setIsUserLoading(false)
    }
  }, [])

  useEffect(() => {
    void getUserApp()
  }, [])

  const changeCategoriesState = () => {
    setCategoriesState(!categoriesState)
  }
  const changeSearchState = () => {
    setSearchOpened(!searchOpened)
  }
  const userUpdate = (payload: Partial<IUser>) => {
    setUser((prev) => {
      if (prev) {
        return { ...prev, ...payload }
      }
      return prev
    })
  }
  const updateGameId = (id: ESteamAppId) => {
    setGameId(id)
  }

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
        updateGameId,
        isUserLoading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
