'use client'

import { CartContext, CartState } from "@/context/CartContext"
import { CardItem } from "@/types/Card"
import { useReducer, useState } from "react"

interface IProps {
  children: React.JSX.Element
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: { type: string; payload: any }): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item already exists in the cart
      const itemExists = state.items.find((item: CardItem) => item.id === action.payload.id);

      if (itemExists) {
        // Item already exists, don't add it again
        return state;
      }

      // Item doesn't exist, add it to the cart
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_FROM_CART':
      // Filter out the item with the provided ID
      const updatedItems = state.items.filter((item: CardItem) => item.id !== action.payload);

      return {
        ...state,
        items: updatedItems,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: IProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Function to add an item to the cart
  const addToCart = (item: CardItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  // Function to remove an item from the cart by ID
  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState,
        addToCart: addToCart,
        removeFromCart: removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}