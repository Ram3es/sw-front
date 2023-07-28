import { type IOffersCard } from './Card'

export interface IOffersResponse {
  offers: IOffersCard[]
  total: number
  sortBy: string
  sortByOptions: any[]

}
