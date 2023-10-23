import { IFilterwithCheckbox, IOfferFilter } from "@/constants/market-offers";
import { IOffersCard } from "@/types/Card";
import { ESteamAppId } from "@/types/Inventory";
import { ISortingState } from "@/types/Market";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

type TRange = { value: number[], data: number[], options: number[] }

export interface IInitialFiltersState {
    appId: ESteamAppId | null
    sortBy: string | null
    pattern: string | null
    priceFrom: number | null
    priceTo: number | null
    wearFrom: number | null
    wearTo: number | null
    tradableIn: number | null
    quality: string[] | null
    rarity: string[] | null
    variant: string
}

export interface IFiltersSideBar {
    pattern: string
    tradableIn: { value: number, data: number[] }
    priceRange: TRange
    wear: TRange
    quality: IFilterwithCheckbox[]
    rarity: IFilterwithCheckbox[]
    variant: { value: string, options: IOfferFilter[] }
  }
export type TValue <K extends keyof IInitialFiltersState> = Record<K, IInitialFiltersState[K]>
export type TKeysCheckboxFilter = keyof Pick<IInitialFiltersState,'quality' | 'rarity'>


export interface IMarketOffersCtx {
    renderCards: IOffersCard[]
    filtersState: Record<string, any>
    sortOptions:ISortingState
    isSelectedSideBarFilter: boolean
    sidebarFilters: IFiltersSideBar
    defaultSideBarStateFilters: IFiltersSideBar
    hasMore: boolean
    isLoading: boolean
    search: string
    setSideBarFilters:  Dispatch<SetStateAction<IFiltersSideBar>>
    updateFilter: <K extends keyof IInitialFiltersState>(value: TValue<K>) => void
    setDefaultFilters: (query: string) => Promise<void>
    getFilteredItems:  (query: string) => Promise<void>
    updateFilterWithCheckbox: (filterKey:TKeysCheckboxFilter, value: string) => void
    setHeaderFilterOptions: Dispatch<SetStateAction<ISortingState>>
    resetSideBarFilters: () => void
    resetFilters: (appId?: ESteamAppId) => void
    updatePage: () => void
    setSearch: Dispatch<SetStateAction<string>>
    
}


export const MarketOffersContext = createContext<IMarketOffersCtx | undefined>(undefined)

export const useMarketOffersCtx = () => {
    const context = useContext(MarketOffersContext)
    if (!context) {
        throw new Error('Context must be used within a Provider')
      }
    return context
}