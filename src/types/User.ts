export interface IUser {
  id: string
  username: string
  balance: number
  payoutLimit?: number
  avatar: string
}

export interface ISteamUser {
  avatarUrl: string
  balance: string
  banned: number
  payoutOk: number
  profileUrl: string
  steamId: string
  steamUsername: string
}
