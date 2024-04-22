import { ITradeOffersResponse } from '@/types/Market'
import { IMakeTradeOffer, type SteamItem } from '../../types/Inventory'
import { GET, POST } from '../axios.instance'

type TResponse = Record<string, SteamItem>

export const getInventory = async (gameId: string) => await GET<TResponse>(`/inventory?appid=${gameId}`)

export const makeTradeOffer = async (data: IMakeTradeOffer[]) => POST('steam/make-offer', {tradeItems: data})

export const createTrade = async (offerId: string) => await GET<ITradeOffersResponse[]>(`steam/create-trade/${offerId}`)

export const receiveTradeOffers =  async () => await GET<any[]>('inventory/trade-offers')
