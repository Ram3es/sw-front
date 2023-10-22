'use client'
import { useAppContext } from "@/context/AppContext"
import { IFiltersSideBar, IInitialFiltersState, MarketOffersContext, TKeysCheckboxFilter, TValue } from "@/context/MarketOffers"
import { generateQuery } from "@/helpers/generateQuery"
import { getOffers } from "@/services/market/market"
import { IOffersCard } from "@/types/Card"
import { ESteamAppId } from "@/types/Inventory"
import { ISortingState } from "@/types/Market"
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"

const initialFiltersState: Record<string, any> = {}

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
const [sortOptions, setHeaderFilterOptions] = useState<ISortingState>({sortBy:'', options:[]})
const [renderCards, setRenderCards] = useState<IOffersCard[]>([])
const [sidebarFilters, setSideBarFilters] = useState<IFiltersSideBar>(initSideBarState)
const [defaultSideBarStateFilters, setDefaultStateFilters] =useState<IFiltersSideBar>(initSideBarState)
const [amountPages, setAmountPages] = useState<number>(0)
const [isLoading, setIsLoading]= useState(false)

const { gameId } = useAppContext()
const hasMore = useMemo(() => filtersState.page ? filtersState.page < amountPages : true, [filtersState, amountPages])

const updateFilter = <K extends keyof IInitialFiltersState>(value: TValue<K>): void => {
    setFiltersState(prev => ({
        ...prev,
        ...value,
        page: 1
    }))
}
const updateFilterWithCheckbox = (filterKey:TKeysCheckboxFilter, value: string) => {
  setFiltersState(prev => ({
    ...prev,
    page: 1,
    [filterKey]: prev[filterKey]?.some((el: string) => el === value ) 
      ?  prev[filterKey]?.filter((el: string) => el !== value)
      : [ ...prev[filterKey] ?? [], value ]
  }) )
 }

 const updatePage = () => {
  setFiltersState( prev => ({
    ...prev,
    page: prev.page ? prev.page + 1 : 2
  }))
 }

  // checking was changed sidebar filters
  const isSelectedSideBarFilter = useMemo((): boolean => {
    if (typeof window === 'undefined') {
      return false
    }

    if (!window.navigator.cookieEnabled) {
      return false
    }

    const initialFiltersString = window.localStorage.getItem('filters')
    if (!initialFiltersString) {
      return false
    }

    const initFilters = JSON.parse(initialFiltersString) as IFiltersSideBar
    if (Object.keys(initFilters).length !== Object.keys(sidebarFilters).length) {
      return false
    }

    return Object.entries(sidebarFilters).some(([key, value]) => {
      if (typeof value !== 'object' && Array.isArray(value)) {
        return sidebarFilters[key as keyof IFiltersSideBar] !== initFilters[key as keyof IFiltersSideBar]
      }

      if (Array.isArray(value) && value.length) {
        return value.some((el) => el.selected)
      }

      const initValue = initFilters[key as keyof IFiltersSideBar] as { value: any }
      if (Array.isArray(value.value) && value.value.length && Array.isArray(initValue.value)) {
        return value.value.some((item: any, index: number) => item !== initValue.value[index]);
      }

      return initValue.value !== value.value
    })
  }, [sidebarFilters])

const resetFilters = () => {
  Object.entries(filtersState).forEach(([key, value]) =>{
    if( value || value === 0 ){
      setFiltersState(prev => ({
        ...prev,
        [key]: initialFiltersState[key as keyof IInitialFiltersState],
      }))
    }
  })
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

const setDefaultFilters = useCallback(async (appId: ESteamAppId) => {
  setFiltersState({})
    try {
      const { defaultFilters, sortByOptions, offers, sortBy, total  } = await getOffers(`appId=${appId}`)

      
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
      setAmountPages(Math.ceil(total / 24))
      localStorage.setItem('filters', JSON.stringify(initFilters) )

    } catch (error) {
      console.log(error)
    }
  }, [])

  const getFilteredItems = useCallback( async (query: string) => {
    try {
      const { offers } = await getOffers(`appId=${gameId}${query ? `&${query}` : '' }`)
      setIsLoading(false)
      if(filtersState?.page > 1){
        return setRenderCards(prev => ([...prev, ...offers]))
      }
      window.scrollTo({top: 0, behavior: "instant"})
      setRenderCards(offers)
    } catch (error) {
      console.log(error)
    }

  }, [sortOptions, gameId, filtersState])


  useEffect(() => {
    if(Object.keys(filtersState).length){
      const copiedState = {...filtersState, sortBy: sortOptions.sortBy, page:filtersState.page ?? 1 }
      const filtersQuery = generateQuery(copiedState)
      setIsLoading(true)
      void getFilteredItems(filtersQuery)
    }
   }, [filtersState, sortOptions])

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
        setDefaultFilters,
        resetFilters,
        resetSideBarFilters,
        getFilteredItems,
        updatePage,
        
        }}>
          {children}
      </MarketOffersContext.Provider>
    )
}