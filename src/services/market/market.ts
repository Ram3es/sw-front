import { IOffersCard } from '@/types/Card'
import { type ITradeOffersResponse, type IOffersResponse, IOfferHistory, IHistorySalesOfferRes, ISimilarOffersRes } from '../../types/Market'
import { GET, POST } from '../axios.instance'

export const getOffers = async (query: string) => await GET<IOffersResponse>('market/offers?'.concat(query))

export const getOfferById = async (id: string) => await GET<IOffersCard>(`market/offer?offerId=${id}`)

export const getOfferSalesHistory = async (id: string) => await GET<IHistorySalesOfferRes>(`market/get-sales-history-of-offer-product?offerId=${id}`)

export const getSimilarOffers = async () => GET<ISimilarOffersRes>(`market/similar-offers`)

export const getItemsToWithdraw = async () => await GET<any>('market/inventory')

export const buyItems = async (params: { assetIds: string[] }) => await POST<string, typeof params>('/market/buy', params)

export const withdrawItems = async (params: { assetIds: string[] }) => await POST<string, typeof params>('/market/withdraw', params)

export const getTradeOffers = async () => await GET<ITradeOffersResponse[]>('/market/withdraw/transactions')
