import { CardItem, IOfferInventory } from "./Card"

export interface SteamItem {
  id: string
  image: string
  name: string
  assetid: string
  classid: string
  appid: string
  price: number
}

export enum ESteamAppId {
  CSGO = '730',
  // DOTA2 = '570',
  // TF2 = '252490',
  RUST = '252490',
}

export type ITradeItem = Pick<IOfferInventory,'appid' | 'assetid' | 'name' | 'amount' | 'icon_url'>
export type IMakeTradeOffer  = Pick<IOfferInventory,'appid' | 'assetid' | 'classid' | 'instanceid' | 'name' | 'steamid' | 'amount'  | 'tradable' & { price : number }>
export interface IInventoryCard extends IOfferInventory, Pick<CardItem, 'id' | 'isTradable' | 'isSelected' | 'isInWithdraw' | 'image' | 'condition' | 'variant' | 'type'> {}