export interface IUser {
  id: string
  username: string
  balance: number
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
