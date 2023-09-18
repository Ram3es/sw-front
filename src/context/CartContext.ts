import { CardItem, IOffersCard } from '@/types/Card'
import { createContext, useContext } from 'react'

export interface CartState {
  items: IOffersCard[]
}

export interface ICartContext {
  cartItems: CartState
  checkoutStatus: boolean
  lastAddedItem: IOffersCard | null
  setLastAddedItem: (item: IOffersCard | null) => void
  addToCart: (item: IOffersCard) => void
  removeFromCart: (itemId: string) => void
  getSteamTotalPrice: () => number
  getDiscount: () => number
  getTotal: () => number
}

export const CartContext = createContext<ICartContext | undefined>(undefined)

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
