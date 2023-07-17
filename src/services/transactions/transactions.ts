import { type SteamItem } from '../../types/Inventory'
import { GET } from '../axios.instance'

type TResponse = Record<string, SteamItem>

export const getTransactions = async () => await GET<TResponse>('/payments/transactions')
