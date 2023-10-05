'use client'
import { OTHER_FILTER, RARITY_FILTER } from "@/constants/market-offers"
import { useAppContext } from "@/context/AppContext"
import { IFiltersSideBar, IInitialFiltersState, MarketOffersContext, TKeysCheckboxFilter, TValue } from "@/context/MarketOffers"
import { getOffers } from "@/services/market/market"
import { IOffersCard } from "@/types/Card"
import { ESteamAppId } from "@/types/Inventory"
import { ISortByOptions } from "@/types/Market"
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"

const initialFiltersState:IInitialFiltersState  = {
    appId: ESteamAppId.CSGO,
    sortBy: 'HotDeals',
    pattern: null,
    priceFrom: 0,
    priceTo: 0,
    wearFrom: 0,
    wearTo: 0,
    tradableIn: null,
    quality: [],
    rarity: [],
    offers: ''
}

const initSideBarState:IFiltersSideBar = {
  pattern: '',
  tradableIn: 8,
  price:[3, 1000000],
  wear: [3, 1000],
  other: OTHER_FILTER,
  rarity: RARITY_FILTER,
}

export const MarketOffersProvider: FC<PropsWithChildren> = ({ children }) => {
const [filtersState, setFiltersState] = useState(initialFiltersState)
const [headerFilterOptions, setHeaderFilterOptions] = useState<ISortByOptions[]>([])
const [renderCards, setRenderCards] = useState<IOffersCard[]>([])
const [sidebarFilters, setSideBarFilters] = useState<IFiltersSideBar>(initSideBarState)

const { gameId } = useAppContext()


const updateFilter = <K extends keyof IInitialFiltersState>(value: TValue<K>): void => {
    setFiltersState(prev => ({
        ...prev,
        ...value
    }))
}
const updateFilterWithCheckbox = (filterKey:TKeysCheckboxFilter, value: string) => {
  setFiltersState(prev => ({
    ...prev,
    [filterKey]: prev[filterKey].some((el) => el === value ) 
      ?  prev[filterKey].filter(el => el !== value)
      : [ ...prev[filterKey], value ]
  }) )
 }

const isSelectedSideBarFilter = useMemo(():boolean => {
 return Object.entries(sidebarFilters).some(([key, value]) => {
  if(Array.isArray(value) && !value.length){
    return false
  }
  return value !== initSideBarState[key as keyof IFiltersSideBar]
  }) 
},[sidebarFilters])

const resetFilters = () => {
  Object.entries(filtersState).forEach(([key, value]) =>{
    if(!['appId','sortBy'].includes(key) && value ){
      setFiltersState(prev => ({
        ...prev,
        [key]: initialFiltersState[key as keyof IInitialFiltersState] 
      }))
    }
  })
}

const resetSideBarFilters = () => {
  setSideBarFilters(initSideBarState)
}
const getMarketOffers = useCallback(async (query?: string) => {
    try {
      const res = await getOffers(query ?? '')
      setRenderCards(res.offers)
      setHeaderFilterOptions(res.sortByOptions)
    } catch (error) {
      console.log(error)
    }
  }, [])

 useEffect(() => {
 if(gameId !== filtersState.appId ) {
    updateFilter({ appId: gameId })
 }
 }, [gameId])



    return (
      <MarketOffersContext.Provider value={{
        renderCards,
        filtersState,
        headerFilterOptions,
        isSelectedSideBarFilter,
        sidebarFilters,
        setSideBarFilters,
        setHeaderFilterOptions,
        updateFilter,
        updateFilterWithCheckbox,
        getMarketOffers,
        resetFilters,
        resetSideBarFilters
        
        }}>
          {children}
      </MarketOffersContext.Provider>
    )
}