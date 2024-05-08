import { IFilterwithCheckbox, IOfferFilter } from "@/constants/market-offers";
import { IOfferInventory } from "@/types/Card";
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

// filters microservice new
export interface IMarketOfferFilters {
  offset: number;
  limit: number;
  sort:  string  //'price-asc' | 'price-desc' | 'float-desc' | 'float-asc';
  priceType: 'buy' | 'trade' | 'sell';
  priceMin: number | null;
  priceMax: number | null;
  appid: ESteamAppId;
  exterior: any;
  type: any;
  rarity: any;
  weapon: any;
  collection: any;
  other: any;
  category: any;
  itemName: string;
  tradehold: number;
  exact: boolean;
  wearFrom: number | null
  wearTo: number | null
  variant: string
  pattern: string | null 
  tradableIn: number | null
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
export type TValue <K extends keyof IMarketOfferFilters> = Record<K, IMarketOfferFilters[K]>
export type TKeysCheckboxFilter = keyof Pick<IInitialFiltersState,'quality' | 'rarity'>


export interface IMarketOffersCtx {
    renderCards: IOfferInventory[]
    filtersState: Record<string, any>
    sortOptions:ISortingState
    isSelectedSideBarFilter: boolean
    sidebarFilters: IFiltersSideBar
    defaultSideBarStateFilters: IFiltersSideBar
    hasMore: boolean
    isLoading: boolean
    setSideBarFilters:  Dispatch<SetStateAction<IFiltersSideBar>>
    updateFilter: <K extends keyof IMarketOfferFilters>(value: TValue<K>) => void
    getFilteredItems:  () => Promise<void>
    updateFilterWithCheckbox: (filterKey:TKeysCheckboxFilter, value: string) => void
    setHeaderFilterOptions: Dispatch<SetStateAction<ISortingState>>
    resetSideBarFilters: () => void
    resetFilters: (appId?: ESteamAppId) => void
    updatePage: () => void
    
}


export const MarketOffersContext = createContext<IMarketOffersCtx | undefined>(undefined)

export const useMarketOffersCtx = () => {
    const context = useContext(MarketOffersContext)
    if (!context) {
        throw new Error('Context must be used within a Provider')
      }
    return context
}