import { IOfferInventory, IOfferPrice, type IOffersCard } from './Card'
import { ITradeItem } from './Inventory'

export interface IOffersResponse {
  offers: IOfferInventory[]
  total: number
  sortBy: string
  sortByOptions: ISortByOptions[]
  defaultFilters: IDefaultFilters []
  limit: number
}

export interface ITradeOffersResponse {
  id: number
  steamId: string
  tradeId: string
  tradeOfferId: string
  botId: string
  state: string
  type: any
  extra: any
  createdAt: string
  updatedAt: string
  items: any[]
  botProfile: BotProfile
  trade_items: ITradeItem[]
}

export interface BotProfile {
  id: number
  name: string
  avatarHash: string
  memberSince: string
  botSteamId: string
  level: number
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
