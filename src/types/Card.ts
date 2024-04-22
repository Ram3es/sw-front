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
  colorName?: string
  onChange?: () => void
  onClick: () => void
  submitFn?: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  variant?: keyof typeof ECardVariant
  forwardRef?: ((node: any) => void) | null
}

export interface IOffersCard {
  appId: ESteamAppId
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

export interface IOfferInventory {
  steamid: string
  appid: number
  assetid: string
  classid: string
  instanceid: string
  amount: number
  tradable: boolean
  tradehold_days: number
  tradehold_expires: any
  inspect_link: string
  reserved: boolean
  name: string
  stackId: string
  icon_url: string
  qualities: IQualities
  price: IPrice
  overstock: IOverstock
}

export interface IQualities {
  commodity: boolean
  exterior: string
  rarity: string
  weapon: string
  type: string
  stattrak: boolean
  souvenir: boolean
  category: any
  collection: string
  name_color: string
  doppler_phase: any
}

export interface IPrice {
  sell: number
  trade: number
  buy: number
}

export interface IOverstock {
  limit: number
  count: number
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
export type TInventoryCard = TItemInventory & { isChecked: boolean, appId: number  }
export type TTradeOfferCard = Omit<IItemSelectedCard, 'onClick' | 'price' >
