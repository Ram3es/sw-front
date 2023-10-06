import { IOfferPrice, type IOffersCard } from './Card'

export interface IOffersResponse {
  offers: IOffersCard[]
  total: number
  sortBy: string
  sortByOptions: ISortByOptions[]
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
