import { ITransactionRes } from '@/types/Transactions'
import { type SteamItem } from '../../types/Inventory'
import { GET } from '../axios.instance'

export const getTransactions = async () => await GET<ITransactionRes[]>('/payments/transactions')
