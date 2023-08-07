
export interface CardItem {
  id: string
  isTradable?: boolean
  timeToTrade?: number
  image: string
  isSelected?: boolean
  isNoFee?: boolean
  price: number
  steamPrice?: number
  name: string
  type: string
  condition: number
  onClick: () => void
  submitFn?: () => void
  variant?: keyof typeof ECardVariant
}

export interface IOffersCard {
  appid: number
  imageUrl: string
  inventoryItemId: string
  price: IOfferPrice
  steamPrice: IOfferPrice
  wearFloat: number
  rarity: string
  typeName: string
  name: string
}

interface IOfferPrice { amount: number, currency: string }

export interface ConditionItem {
  maxVal: number
  color: string
  text: string
}

export enum ECardVariant {
  sell = 'sell',
  market = 'market',
  withdraw = 'withdraw'
}

export interface IItemSelectedCard extends Pick<CardItem, 'id' | 'condition' | 'image' | 'name' | 'onClick' | 'price'> {

}

export type TItemInventory = Omit<CardItem, 'onClick' | 'isSelected'>
export type TInventoryCard = TItemInventory & { isChecked: boolean }
