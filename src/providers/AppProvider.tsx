'use client'
import { useCallback, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { type IUser } from '../types/User'
import { getUser, getUserBalance } from '../services/user/user'
import { ESteamAppId } from '../types/Inventory'
import { useSearchParams } from 'next/navigation'
import { IToast } from '@/types/Settings'
import { EToastType } from '@/types/Enums'

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
  const [listToasts, setToast] = useState<IToast[]>([])

  
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

  const showToast = (message:string, type = EToastType.error) => {
    const id = Date.now().toString()
    const toast: IToast = {
      id,
      type,
      message
    }
    setToast(prev => [...prev, toast ].slice(-2))
  }

  const removeToast = (id: string) => {
    setToast(prev => prev.filter( val => val.id !== id ) )
  }

  return (
    <AppContext.Provider
      value={{
        getCurrentBalanceAndUpdate,
        changeCategoriesState,
        changeSearchState,
        updateGameId,
        userUpdate,
        showToast,
        removeToast,
        categoriesState,
        isUserLoading,
        searchOpened,
        gameId,
        user,
        listToasts
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
