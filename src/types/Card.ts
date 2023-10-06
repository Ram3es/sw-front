import { ESteamAppId } from "./Inventory"

export interface CardItem {
  id: string
  isTradable?: boolean
  isInWithdraw?: boolean
  timeToTrade?: number
  image: string
  isSelected?: boolean
  isNoFee?: boolean
  price: number
  steamPrice?: number
  name: string
  type: string
  condition: number
  onChange?: () => void
  onClick: () => void
  submitFn?: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  variant?: keyof typeof ECardVariant
}

export interface IOffersCard {
  appid: ESteamAppId
  imageUrl: string
  inventoryItemId: string
  price: IOfferPrice
  steamPrice: IOfferPrice
  wearFloat: number 
  rarity: string | null
  typeName: string
  name: string
  tradableIn: number
  quality: string
  pattern?: number
}

export interface IOfferPrice { amount: number, currency: string }

export interface ConditionItem {
  maxVal: number
  color: string
  text: string
  shortText: string
}

export enum ECardVariant {
  sell = 'sell',
  offer = 'offer',
  market = 'market',
  withdraw = 'withdraw',
  purchased = 'purchased'
}

export interface IItemSelectedCard extends Pick<CardItem, 'id' | 'condition' | 'image' | 'name' | 'variant' > {
  price?: number
  steamPrice?: number
  onClick?: () => void
  isBorderBottom?: boolean
}

export type TItemInventory = Omit<CardItem, 'onClick' | 'isSelected'>
export type TInventoryCard = TItemInventory & { isChecked: boolean }
export type TTradeOfferCard = Omit<IItemSelectedCard, 'onClick' | 'price' >
