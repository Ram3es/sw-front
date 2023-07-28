import { type IOffersResponse } from '../../types/Market'
import { GET } from '../axios.instance'

export const getOffers = async (sortBy: string) => await GET<IOffersResponse>(`market/offers?appid=730&sortBy=${sortBy}`)
