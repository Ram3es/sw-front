import { IUpdateSettingDto } from '@/types/Settings'
import { IUserWithSettingsData, type ISteamUser } from '../../types/User'
import { GET, PATCH, PUT } from '../axios.instance'

export const getUser = async () => await GET<ISteamUser>('/users/me')

export const getUserBalance = async () => await GET<{ balance: number}>('/users/balance')

export const getUserAccountSettings = async () => await GET<IUserWithSettingsData>('/users')

export const updateSettings = async (data: IUpdateSettingDto) => await PATCH('/users', data)

export const setBillingAddress = async (data: any) => await PUT('/users/address', data)

export const setWallet = async (data: { currency: string, wallet: string, id?: number }) => await PUT('/users/wallet', data)

export const setPaymentAccount = async (data: { accountType: string, accountNumber: string, id?: number }) => await PUT('/users/account', data)