import { CardItem, IOfferInventory, IOffersCard } from '@/types/Card'
import { createContext, useContext } from 'react'

export interface CartState {
  items: IOfferInventory[]
}

export interface ICartContext {
  cartItems: CartState
  isCheckoutCompleted: boolean
  lastAddedItem: IOfferInventory | null
  setLastAddedItem: (item: IOfferInventory | null) => void
  addToCart: (item: IOfferInventory) => void
  removeFromCart: (itemId: string) => void
  getSteamTotalPrice: () => number
  getDiscount: () => number
  getTotal: () => number
  clearCart: () => void
}

export const CartContext = createContext<ICartContext | undefined>(undefined)

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
