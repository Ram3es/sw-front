'use client'
import { useAppContext } from "@/context/AppContext"
import { IFiltersSideBar, IInitialFiltersState, MarketOffersContext, TKeysCheckboxFilter, TValue } from "@/context/MarketOffers"
import { getOffers } from "@/services/market/market"
import { IOffersCard } from "@/types/Card"
import { ESteamAppId } from "@/types/Inventory"
import { ISortByOptions, ISortingState } from "@/types/Market"
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"

const initialFiltersState:IInitialFiltersState  = {
    appId: null,
    sortBy: null,
    pattern: null,
    priceFrom: null,
    priceTo: null,
    wearFrom: null,
    wearTo: null,
    tradableIn: null,
    quality: null,
    rarity: null,
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
const [headerFilterOptions, setHeaderFilterOptions] = useState<ISortingState>({sortBy:'', options:[]})
const [renderCards, setRenderCards] = useState<IOffersCard[]>([])
const [sidebarFilters, setSideBarFilters] = useState<IFiltersSideBar>(initSideBarState)


const [defaulSideBarStateFilters, setDefaultStateFilters] =useState<IFiltersSideBar>(initSideBarState)

const updateFilter = <K extends keyof IInitialFiltersState>(value: TValue<K>): void => {
    setFiltersState(prev => ({
        ...prev,
        ...value
    }))
}
const updateFilterWithCheckbox = (filterKey:TKeysCheckboxFilter, value: string) => {
  setFiltersState(prev => ({
    ...prev,
    [filterKey]: prev[filterKey]?.some((el) => el === value ) 
      ?  prev[filterKey]?.filter(el => el !== value)
      : [ ...prev[filterKey] ?? [], value ]
  }) )
 }

 // checking was changed sidebar filters
const isSelectedSideBarFilter = useMemo(():boolean => {
  if (typeof localStorage !== "undefined") {
  const initialFiltersString  = localStorage?.getItem('filters')
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
  }
  return false

},[sidebarFilters])

const resetFilters = (appId?:ESteamAppId ) => {
  
  Object.entries(filtersState).forEach(([key, value]) =>{
    
    if( value || value === 0 ){
      setFiltersState(prev => ({
        ...prev,
        [key]: initialFiltersState[key as keyof IInitialFiltersState],
        appId: appId ?? null
      }))
    }
  })
}


const resetSideBarFilters = () => {
  if (typeof localStorage !== "undefined") {
    const initialFilters = localStorage?.getItem('filters')
    if(initialFilters){
      setSideBarFilters(JSON.parse(initialFilters))
    } 
  }
}
const setDefaultFilters = useCallback(async (appId: ESteamAppId) => {
    try {
      const { defaultFilters, sortByOptions, offers, sortBy  } = await getOffers(`appId=${appId}&sortBy=HotDeals`)

      
      // create initial sidebar state
      const initFilters: Record<string, any> = {}

      defaultFilters.forEach(filter => {
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

        
      })
      setHeaderFilterOptions(prev => ({
        prev,
        options: sortByOptions,
        sortBy
      }))
      setSideBarFilters(initFilters as IFiltersSideBar )
      setDefaultStateFilters(initFilters as IFiltersSideBar)
      setRenderCards(offers)
      localStorage.setItem('filters', JSON.stringify(initFilters) )

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