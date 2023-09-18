'use client'

import { CHECKOUT_SETTINGS } from '@/constants/checkout'
import { CartContext, CartState } from '@/context/CartContext'
import { IOffersCard } from '@/types/Card'
import { useReducer, useState } from 'react'

interface IProps {
  children: React.JSX.Element
}

const initialState: CartState = {
  items: []
}

const cartReducer = (state: CartState, action: { type: string; payload: any }): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item already exists in the cart
      const itemExists = state.items.find(
        (item: IOffersCard) => item.inventoryItemId === action.payload.inventoryItemId
      )

      if (itemExists) {
        // Item already exists, don't add it again
        return state
      }

      // Item doesn't exist, add it to the cart
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    case 'REMOVE_FROM_CART':
      // Filter out the item with the provided ID
      const updatedItems = state.items.filter((item: IOffersCard) => item.inventoryItemId !== action.payload)

      return {
        ...state,
        items: updatedItems
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }: IProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState)
  const [lastAddedItem, setLastAddedItem] = useState<IOffersCard | null>(null)

  // Function to add an item to the cart
  const addToCart = (item: IOffersCard) => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
    console.log('item', item);
    
    setLastAddedItem(item);
    setTimeout(() => setLastAddedItem(null), CHECKOUT_SETTINGS.DURATIOM_MODAL_CART_ADDED)
    
  }

  // Function to remove an item from the cart by ID
  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
  }

  const getSteamTotalPrice = () => cartState.items.reduce((prev, cur) => (prev += cur.steamPrice.amount), 0)
  const getDiscount = () => cartState.items.reduce((prev, cur) => (prev += cur.steamPrice.amount - cur.price.amount), 0)
  const getTotal = () => cartState.items.reduce((prev, cur) => (prev += cur.price.amount), 0)

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState,
        checkoutStatus: false,
        lastAddedItem,
        setLastAddedItem,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        getSteamTotalPrice,
        getDiscount,
        getTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
