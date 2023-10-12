'use client'
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
    priceFrom: null,
    priceTo: null,
    wearFrom: null,
    wearTo: null,
    tradableIn: null,
    quality: [],
    rarity: [],
    variant: ''
}

const initSideBarState:IFiltersSideBar = {
  pattern: '',
  tradableIn: { value: 8, data: []},
  priceRange: { value: [], data: [] },
  wear: { value: [], data: [] },
  quality: [],
  rarity: [],
  variant: { value: '', options: [] }
}

export const MarketOffersProvider: FC<PropsWithChildren> = ({ children }) => {
const [filtersState, setFiltersState] = useState(initialFiltersState)
const [headerFilterOptions, setHeaderFilterOptions] = useState<ISortByOptions[]>([])
const [renderCards, setRenderCards] = useState<IOffersCard[]>([])
const [sidebarFilters, setSideBarFilters] = useState<IFiltersSideBar>(initSideBarState)

const [defaulSideBarStateFilters, setDefaultStateFilters] =useState<IFiltersSideBar>(initSideBarState)



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

 // checking was changed sidebar filters
const isSelectedSideBarFilter = useMemo(():boolean => {
  const initialFiltersString  = localStorage.getItem('filters')
  if(initialFiltersString){
    const initFilters = JSON.parse(initialFiltersString) as IFiltersSideBar

    return Object.entries(sidebarFilters).some(([key, value]) => {
      if(typeof value === 'object' && !Array.isArray(value) ){

        const initValue = initFilters[key as keyof IFiltersSideBar] as {value: any} 
        if(Array.isArray(value.value) && value.value.length && Array.isArray(initValue.value)){
          for(let i = 0; i < value.value.length; i++ ){
            if(value.value[i] !== initValue.value[i]){
              return true
            }
          }
          return false
        }
        return initValue.value !== value.value 
      }
      if(Array.isArray(value) && value.length ){
        return value.some((el) => el.selected )
      }
      return sidebarFilters[key as keyof IFiltersSideBar] !== initFilters[key as keyof IFiltersSideBar]
    })
  }
  return false

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
  const initialFilters  = localStorage.getItem('filters')
  if(initialFilters){
    setSideBarFilters(JSON.parse(initialFilters))
  } 
}
const setDefaultFilters = useCallback(async (query?: string) => {
    try {
      const res = await getOffers(`appId=${ESteamAppId.CSGO}&sortBy=HotDeals`)
      
      // create initial sidebar state
      const initFilters: Record<string, any> = {}

      res.defaultFilters.forEach(filter => {
        if(filter.type === 'range'){
         return initFilters[filter.name] = { value: filter.value, data: filter?.diagramData?.map((el: { count: any }) => el?.count) }
        }
        if(filter.type === 'multiple-choice-filter'){
           return initFilters[filter.name] = filter?.options?.map(el => ({...el, selected: false}))
        }
        if(filter.type === 'radio'){
          return initFilters[filter.name] = ({value: filter.value, options:filter.options})
        }
        initFilters[filter.name] = filter.value ?? ''

        setHeaderFilterOptions(res.sortByOptions)
        setSideBarFilters(initFilters as IFiltersSideBar )
        setDefaultStateFilters(initFilters as IFiltersSideBar)
        localStorage.setItem('filters', JSON.stringify(initFilters) )
      })

    } catch (error) {
      console.log(error)
    }
  }, [])

  const getFilteredItems = useCallback( async (query?: string) => {
    try {
      const { offers } = await getOffers(query ?? '')
      setRenderCards(offers)
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
        defaulSideBarStateFilters,
        setSideBarFilters,
        setHeaderFilterOptions,
        updateFilter,
        updateFilterWithCheckbox,
        setDefaultFilters,
        resetFilters,
        resetSideBarFilters,
        getFilteredItems
        
        }}>
          {children}
      </MarketOffersContext.Provider>
    )
}