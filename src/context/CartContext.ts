import { CardItem, IOffersCard } from "@/types/Card";
import { createContext, useContext } from "react";

export interface CartState {
  items: IOffersCard[];
}

export interface ICartContext {
  cartItems: CartState
  addToCart: (item: IOffersCard) => void
  removeFromCart: (itemId: string) => void
}

export const CartContext = createContext<ICartContext | undefined>(undefined)

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};