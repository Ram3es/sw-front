import { IUserWithSettingsData, type ISteamUser } from '../../types/User'
import { GET, PATCH } from '../axios.instance'

export const getUser = async () => await GET<ISteamUser>('/users/me')

export const getUserAccountSettings = async () => await GET<IUserWithSettingsData>('/users')

// export const updateSettings = async (data: Record<string, string | number>) => await PATCH('/user', data)