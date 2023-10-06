'use client'
import { Button } from "@/components/Navigation"
import { useCartContext } from "@/context/CartContext"
import { classNames } from "@/helpers/className"
import { IOffersCard } from "@/types/Card"
import { useEffect } from "react"

export const AddOfferToCart = ({ offer } : { offer: IOffersCard }) => {
    const { addToCart, cartItems } = useCartContext()
    return(
        <div>
           <Button
              text='add to cart'
              onClick={() => addToCart(offer) }
              className={classNames('bg-skinwalletPink justify-center items-center w-full h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                !cartItems.items.some(item => item.inventoryItemId === offer.inventoryItemId) ? '' : 'pointer-events-none opacity-50')}
            />
        </div>
    )
}