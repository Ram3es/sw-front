
export interface CardItem {
  id: string
  isTradable: boolean
  timeToTrade?: number
  image: string
  isSelected?: boolean
  isNoFee: boolean
  price: number
  name: string
  type: string
  condition: number
  onClick: () => void
  submitFn?: () => void
  variant?: keyof typeof ECardVariant
}

export interface ConditionItem {
  maxVal: number
  color: string
  text: string
}

export enum ECardVariant {
  sell = 'sell',
  market = 'market'
}

export interface IItemSelectedCard extends Pick<CardItem, 'id' | 'condition' | 'image' | 'name' | 'onClick' | 'price'> {

}

export type TItemInventory = Omit<CardItem, 'onClick' | 'isSelected'>
export type TInventoryCard = TItemInventory & { isChecked: boolean }
