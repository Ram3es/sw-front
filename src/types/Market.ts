import { IOfferPrice, type IOffersCard } from './Card'

export interface IOffersResponse {
  offers: IOffersCard[]
  total: number
  sortBy: string
  sortByOptions: ISortByOptions[]
  defaultFilters: IDefaultFilters []
}

export interface ITradeOffersResponse {
  items: IOffersCard[]
  bot_name: string
  createdAt: Date
  security_token: string
  accepted: boolean
  expired_at: Date
  browser_confiramation_url: string
  steam_confiramation_url: string
}

export interface ISortingState {
  sortBy: string
  options: ISortByOptions[]
}
export interface ISortByOptions {
  name: string
  label: string
}

export interface IOfferHistory {
  soldAt: number
  soldFor: IOfferPrice
  wear: number
  paintSeed: number
}

export interface IHistorySalesOfferRes {
  offershHistory : IOfferHistory[]
}

export interface ISimilarOffersRes {
  similarOffers : IOffersCard[]
}
export interface IDefaultFilters {
  label: string
  name: string
  type: string
  value: any
  diagramData?: DiagramDaum[]
  options?: IDefaultOptionRes[] | IDefaultRadioOptionRes[] | IRangeOptions
}
export interface DiagramDaum {
  columnNumber: number
  count: number
}

export interface IDefaultOptionRes {
  label: string
  value: string
  count: number
  warning: any
}
export interface IDefaultRadioOptionRes {
  id: string
  name: string
  count: number
}
export interface IRangeOptions {
  from: {
    amount: number
    currency: string
  },
  to: {
    amount: number
    currency: string
  }
}
