export interface CardItem {
  id: string
  isTradable: boolean
  timeToTrade?: number
  image: string
  isSelected: boolean
  isNoFee: boolean
  price: number
  name: string
  type: string
  condition: number
  onClick: () => void
}

export interface ConditionItem {
  maxVal: number
  color: string
  text: string

}

export interface IItemSelectedCard extends Pick<CardItem, 'id' | 'condition' | 'image' | 'name' | 'onClick' | 'price'> {

}

export type TItemInventory = Omit<CardItem, 'onClick' | 'isSelected'>
export type TInventoryCard = TItemInventory & { isChecked: boolean }
