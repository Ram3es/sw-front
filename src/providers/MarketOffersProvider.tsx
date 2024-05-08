'use client'
import { useAppContext } from "@/context/AppContext"
import { IFiltersSideBar, IInitialFiltersState, IMarketOfferFilters, MarketOffersContext, TKeysCheckboxFilter, TValue } from "@/context/MarketOffers"
import { generateFiltersObject } from "@/helpers/genMarketFilters"
import { generateQuery } from "@/helpers/generateQuery"
import { getOffers } from "@/services/market/market"
import { IOfferInventory, IOffersCard } from "@/types/Card"
import { ISortingState } from "@/types/Market"
import { useSearchParams } from "next/navigation"
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"
import qs from 'qs'

const initialFiltersState: Record<string, any> = {}

const initSideBarState:IFiltersSideBar = {
  pattern: '',
  tradableIn: { value: 8, data: []},
  priceRange: { value: [], data: [], options:[] },
  wear: { value: [], data: [], options:[] },
  quality: [],
  rarity: [],
  variant: { value: '', options: [] }
}

export const MarketOffersProvider: FC<PropsWithChildren> = ({ children }) => {
const [filtersState, setFiltersState] = useState(initialFiltersState)
const [sortOptions, setHeaderFilterOptions] = useState<ISortingState>({sortBy:'', options:[]})
const [renderCards, setRenderCards] = useState<IOfferInventory[]>([])
const [sidebarFilters, setSideBarFilters] = useState<IFiltersSideBar>(initSideBarState)
const [defaultSideBarStateFilters, setDefaultStateFilters] =useState<IFiltersSideBar>(initSideBarState)
const [amountPages, setAmountPages] = useState<number>(0)
const [isLoading, setIsLoading]= useState(false)

const searchParams = useSearchParams()
const { gameId } = useAppContext()

const hasMore = useMemo(() => {
  return filtersState.offset ? filtersState.offset < amountPages : true

} , [filtersState, amountPages])

const updateFilter = <K extends keyof IMarketOfferFilters>(value: TValue<K>): void => {
    setFiltersState(prev => ({
        ...prev,
        ...value,
    }))
}
const updateFilterWithCheckbox = (filterKey:TKeysCheckboxFilter, value: string) => {
  setFiltersState(prev => ({
    ...prev,
    offset: 0,
    [filterKey]: prev[filterKey]?.some((el: string) => el === value ) 
      ?  prev[filterKey]?.filter((el: string) => el !== value)
      : [ ...prev[filterKey] ?? [], value ]
  }) )
 }

 const updatePage = () => {
  setFiltersState( prev => ({
    ...prev,
    offset: prev.offset ? prev.offset + 1 : 1
  }))
 }

 // checking was changed sidebar filters
const isSelectedSideBarFilter = useMemo(():boolean => {
  if (typeof localStorage !== "undefined") {
    
  const initialFiltersString  = localStorage?.getItem('filters')
    if(initialFiltersString){

      const initFilters = JSON.parse(initialFiltersString) as IFiltersSideBar
      if(Object.keys(initFilters).length !== Object.keys(sidebarFilters).length) return false
     
      return Object.entries(sidebarFilters).some(([key, value]) => {
        if(typeof value === 'object' && !Array.isArray(value) ){
  
          const initValue = initFilters[key as keyof IFiltersSideBar] as {value: any} 
          if(Array.isArray(value.value) && value.value.length && Array.isArray(initValue.value)  ){
            if( !initValue.value[1]) return false
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

const resetFilters = () => {
  setFiltersState({ appid: gameId, sort: sortOptions.sortBy})
}

const resetSideBarFilters = () => {
  if (typeof localStorage !== "undefined") {
    const initialFilters = localStorage?.getItem('filters')
    if(initialFilters){
      const state = JSON.parse(initialFilters) as IFiltersSideBar
      setSideBarFilters(prev => ({
        ...prev,
        ...state
      }))
    } 
  }
}

  const getFilteredItems = useCallback(async () => {
    const query = generateQuery({
      appid: filtersState.appid ?? gameId,
      sort: sortOptions.sortBy,
      ...filtersState
    })
    setIsLoading(true)
    try {
       const { defaultFilters, sortByOptions, offers, sortBy, total, limit } = await getOffers(query)

      const initFilters = generateFiltersObject(defaultFilters)

      setHeaderFilterOptions(prev => ({
        prev,
        options: sortByOptions,
        sortBy
      }))
      
      setSideBarFilters(initFilters as IFiltersSideBar )
      setDefaultStateFilters(initFilters as IFiltersSideBar)
      setAmountPages(Math.ceil(total / limit))

      if(filtersState?.offset > 0){
        return setRenderCards(prev => ([...prev, ...offers]))
      } else {
        setRenderCards(offers)
      }
      localStorage.setItem('filters', JSON.stringify(initFilters) )

      setIsLoading(false)
      
      window.scrollTo({top: 0, behavior: "instant"})
      setRenderCards(offers)
    } catch (error) {
      console.log(error)
    }

  }, [gameId, sortOptions, filtersState ])


  useEffect(() => {
    if(Object.keys(filtersState).length){
      setIsLoading(true)
      void getFilteredItems()
      setIsLoading(false)
    }
   }, [filtersState])

   useEffect(() => {
    if(searchParams.toString()){
      const objParams = qs.parse(searchParams.toString())
      setFiltersState(objParams)
    }
   } ,[searchParams])

    return (
      <MarketOffersContext.Provider value={{
        renderCards,
        filtersState,
        sortOptions,
        isSelectedSideBarFilter,
        sidebarFilters,
        defaultSideBarStateFilters,
        hasMore,
        isLoading,
        setSideBarFilters,
        setHeaderFilterOptions,
        updateFilter,
        updateFilterWithCheckbox,
        resetFilters,
        resetSideBarFilters,
        getFilteredItems,
        updatePage,
        
        }}>
          {children}
      </MarketOffersContext.Provider>
    )
}
