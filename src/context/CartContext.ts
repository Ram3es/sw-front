import { CardItem } from "@/types/Card";
import { createContext, useContext } from "react";

export interface CartState {
  items: CardItem[];
}

export interface ICartContext {
  cartItems: CartState
  addToCart: (item: CardItem) => void
  removeFromCart: (itemId: string) => void
}

export const CartContext = createContext<ICartContext | undefined>(undefined)

export const useCartContext = () => useContext(CartContext)