export interface SteamItem {
  id: string
  name: string
  assetid: string
  classid: string
  image: string
  appid: string
  price: number
}

export enum ESteamAppId {
  CSGO = '730',
  DOTA2 = '570',
  TF2 = '252490',
  RUST = '0',
}
