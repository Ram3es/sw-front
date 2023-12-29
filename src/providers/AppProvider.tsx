'use client'
import { useCallback, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { type IUser } from '../types/User'
import { getUser, getUserBalance } from '../services/user/user'
import { ESteamAppId } from '../types/Inventory'
import { useSearchParams } from 'next/navigation'

interface IProps {
  children: React.JSX.Element
}

export const AppProvider = ({ children }: IProps) => {
  const searchParams = useSearchParams()
  const appId = searchParams.get('appId')

  const [categoriesState, setCategoriesState] = useState(false)
  const [searchOpened, setSearchOpened] = useState(false)
  const [gameId, setGameId] = useState<ESteamAppId>(appId as ESteamAppId  ?? ESteamAppId.CSGO)
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

  const getCurrentBalanceAndUpdate = useCallback(async() => {
    const { balance } = await getUserBalance()
    userUpdate({ balance })
  },[])

  return (
    <AppContext.Provider
      value={{
        getCurrentBalanceAndUpdate,
        changeCategoriesState,
        changeSearchState,
        updateGameId,
        userUpdate,
        categoriesState,
        isUserLoading,
        searchOpened,
        gameId,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
