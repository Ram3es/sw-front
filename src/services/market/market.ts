import { type ITradeOffersResponse, type IOffersResponse } from '../../types/Market'
import { GET, POST } from '../axios.instance'

export const getOffers = async (sortBy: string) => await GET<IOffersResponse>(`market/offers?appid=730&sortBy=${sortBy}`)

export const getItemsToWithdraw = async () => await GET<any>('market/inventory')

export const buyItems = async (params: { assetIds: string[] }) => await POST<string, typeof params>('/market/buy', params)

export const withdrawItems = async (params: { assetIds: string[] }) => await POST<string, typeof params>('/market/withdraw', params)

export const getTradeOffers = async () => await GET<ITradeOffersResponse[]>('/market/withdraw/transactions')
