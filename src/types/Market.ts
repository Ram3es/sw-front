import { type IOffersCard } from './Card'

export interface IOffersResponse {
  offers: IOffersCard[]
  total: number
  sortBy: string
  sortByOptions: any[]

}

export interface ITradeOffersResponse {
  items: IOffersCard[]
  bot_name: string
  created_at: Date
  security_token: string
  accepted: boolean
  expired_at: Date
  browser_confiramation_url: string
  steam_confiramation_url: string
}
