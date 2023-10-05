import { IOfferFilter, IOtherFilter, IRarityFilter } from "@/constants/market-offers";
import { IOffersCard } from "@/types/Card";
import { ESteamAppId } from "@/types/Inventory";
import { ISortByOptions } from "@/types/Market";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface IInitialFiltersState {
    appId: ESteamAppId
    sortBy: string
    pattern: string | null
    priceFrom: number
    priceTo: number
    wearFrom: number
    wearTo: number
    tradableIn: number | null
    quality: string[]
    rarity: string[]
    offers: string
}

export interface IFiltersSideBar {
    pattern: string
    tradableIn: number
    price: number[]
    wear: number[]
    other: IOtherFilter[]
    rarity: IRarityFilter[]
  }
export type TValue <K extends keyof IInitialFiltersState> = Record<K, IInitialFiltersState[K]>
export type TKeysCheckboxFilter = keyof Pick<IInitialFiltersState,'quality' | 'rarity'>


export interface IMarketOffersCtx {
    renderCards: IOffersCard[]
    filtersState: IInitialFiltersState
    headerFilterOptions: ISortByOptions[]
    isSelectedSideBarFilter: boolean
    sidebarFilters: IFiltersSideBar
    setSideBarFilters:  Dispatch<SetStateAction<IFiltersSideBar>>
    updateFilter: <K extends keyof IInitialFiltersState>(value: TValue<K>) => void
    getMarketOffers: (query?: string) => Promise<void>
    updateFilterWithCheckbox: (filterKey:TKeysCheckboxFilter, value: string) => void
    setHeaderFilterOptions: Dispatch<SetStateAction<ISortByOptions[]>>
    resetSideBarFilters: () => void
    
}


export const MarketOffersContext = createContext<IMarketOffersCtx | undefined>(undefined)

export const useMarketOffersCtx = () => {
    const context = useContext(MarketOffersContext)
    if (!context) {
        throw new Error('Context must be used within a Provider')
      }
    return context
}