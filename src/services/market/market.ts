import { type IOffersResponse } from '../../types/Market'
import { GET, POST } from '../axios.instance'

export const getOffers = async (sortBy: string) => await GET<IOffersResponse>(`market/offers?appid=730&sortBy=${sortBy}`)

export const getItemsToWithdraw = async () => await GET<any>('market/inventory?appid=730')

export const buyItems = async (params: { assetIds: string[] }) => await POST<string, typeof params>('/market/buy', params)