import { type SteamItem } from '../../types/Inventory'
import { GET } from '../axios.instance'

type TResponse = { default: SteamItem[] } & Record<string, SteamItem>

export const getInventory = async (gameId: string) => await GET<TResponse>(`/inventory?appid=${gameId}`)
