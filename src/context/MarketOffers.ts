import { IFilterwithCheckbox, IOfferFilter } from "@/constants/market-offers";
import { IOffersCard } from "@/types/Card";
import { ESteamAppId } from "@/types/Inventory";
import { ISortByOptions } from "@/types/Market";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

type TRange = { value: number[], data: number[] }

export interface IInitialFiltersState {
    appId: ESteamAppId
    sortBy: string
    pattern: string | null
    priceFrom: number | null
    priceTo: number | null
    wearFrom: number | null
    wearTo: number | null
    tradableIn: number | null
    quality: string[]
    rarity: string[]
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
    filtersState: IInitialFiltersState
    headerFilterOptions: ISortByOptions[]
    isSelectedSideBarFilter: boolean
    sidebarFilters: IFiltersSideBar
    defaulSideBarStateFilters: IFiltersSideBar
    setSideBarFilters:  Dispatch<SetStateAction<IFiltersSideBar>>
    updateFilter: <K extends keyof IInitialFiltersState>(value: TValue<K>) => void
    setDefaultFilters: (query?: string) => Promise<void>
    getFilteredItems:  (query?: string) => Promise<void>
    updateFilterWithCheckbox: (filterKey:TKeysCheckboxFilter, value: string) => void
    setHeaderFilterOptions: Dispatch<SetStateAction<ISortByOptions[]>>
    resetSideBarFilters: () => void
    resetFilters: () => void
    
}


export const MarketOffersContext = createContext<IMarketOffersCtx | undefined>(undefined)

export const useMarketOffersCtx = () => {
    const context = useContext(MarketOffersContext)
    if (!context) {
        throw new Error('Context must be used within a Provider')
      }
    return context
}