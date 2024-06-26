import { IUserAccount, IUserBillingAddress, IUserCryptoWallet } from "./Settings"


export interface IUser {
  id: string
  username: string
  balance: number
  payoutLimit?: number
  avatar: string
  billingAddress?: IUserBillingAddress
}

export interface ISteamUser {
  id: number
  steamId: string
  steamUsername: string
  avatarUrl: string
  profileUrl: string
  payout: number
  banned: number
  balance: number
  transactionsTotal: number
  tradeUrl?: string | null
  notifications: number
  active: number
  email?: string | null
  createdAt: string
  
}
export interface IUserWithSettingsData extends ISteamUser {
  billingAddress: IUserBillingAddress;
  cryptoWallets: IUserCryptoWallet[];
  accounts: IUserAccount[];
}
