import { type ISteamUser } from '../../types/User'
import { GET } from '../axios.instance'

export const getUser = async () => await GET<ISteamUser>('/user/me')
