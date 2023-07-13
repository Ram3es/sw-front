import { type SteamItem } from '../../types/Inventory'
import { GET } from '../axios.instance'

export const getInventory = async (gameId: string) => await GET<Record<string, SteamItem>>(`/inventory?appid=${gameId}`)
