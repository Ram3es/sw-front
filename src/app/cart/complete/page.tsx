'use client'

import ItemCard from '@/components/Content/ItemCard'
import Loader from '@/components/Content/Loader'
import { Button } from '@/components/Navigation'
import { IMAGE_ROOT_URL } from '@/constants/strings'
import { useCartContext } from '@/context/CartContext'
import { buyItems } from '@/services/market/market'
import { CardItem, ECardVariant, IOffersCard } from '@/types/Card'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CartCompleate() {
  const { replace } = useRouter()
  const { cartItems, clearCart } = useCartContext()
  const [ isCheckoutSuccess, setIsCheckoutSuccess ] = useState(false)
  const [ isCheckoutLoading, setIsCheckoutLoading ] = useState(false)
  const [ itemsToShow, setItemsToShow ] = useState<IOffersCard[]>([])

  const submitOrder = async () => {
    if (!isCheckoutLoading) {
      setIsCheckoutLoading(true)
      setItemsToShow(cartItems.items)
      try {
        const assetIds = cartItems.items.map(i => i.inventoryItemId)
        await buyItems({ assetIds })
        setIsCheckoutSuccess(true)
        setIsCheckoutLoading(false)
        clearCart()
      } catch (e) {
        console.log(e)
        setIsCheckoutSuccess(false)
        setIsCheckoutLoading(false)
      }
    }
  }

  useEffect(() => void submitOrder(), [])

 return isCheckoutLoading ? (
  <div className='flex items-center justify-center h-full py-12'>
    <Loader />
  </div>
 ) : isCheckoutSuccess ? (
    <>
      <div className='w-full flex flex-col items-center max-w-[1850px] pt-16 px-16'>
        <div className='w-full flex flex-col max-w-[1160px]'>
          <div className='w-full h-full flex flex-col '>

            <div className=' w-full flex flex-col md:flex-row items-center justify-center pb-8'>
              <div className='flex flex-col items-center text-center text-24 uppercase tracking-[1.2px] text-white'>
                <h2>congratulations!</h2>
                <h2>your purchase is complete</h2>
              </div>
            </div>

            <div className='flex flex-col gap-1 md:flex-row justify-center pb-16'>
              {itemsToShow.map((item: IOffersCard) =>
                item.inventoryItemId ? <ItemCard
                  key={item.inventoryItemId}
                  id={item.inventoryItemId.toString() }
                  variant={ECardVariant.purchased}
                  isTradable={true}
                  name={item.name}
                  type={item.typeName}
                  condition={item.wearFloat}
                  price={item.price.amount}
                  steamPrice={item.steamPrice.amount}
                  image={IMAGE_ROOT_URL.concat(item.imageUrl)}
                  onClick={() => {}}
                    /> : ''
              )}
            </div>
            <div className='flex flex-row justify-center'>
              <Button
                className='bg-skinwalletPink w-max uppercase text-dark-14 hover:opacity-50 cta-clip-path mr-6'
                heightClass='h-12'
                text='withdraw items'
                onClick={() => replace('/market/inventory',)}
              />
              <div className=' w-full sm:w-max relative overflow-hidden hover button'>
                <Button
                  className='bg-black w-max border border-graySecondary uppercase text-graySecondary hover:opacity-50 cta-clip-path'
                  heightClass='h-12'
                  text='continue shopping'
                  onClick={() => replace('/market')}
                />
                <div className='absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : 
  (
    <>
      <div className='w-full flex flex-col items-center max-w-[1850px] pt-16 px-16'>
        <div className='w-full flex flex-col max-w-[1160px]'>
          <div className='w-full h-full flex flex-col '>

            <div className=' w-full flex flex-col md:flex-row items-center justify-center pb-8'>
              <div className='flex flex-col items-center text-center text-24 uppercase tracking-[1.2px] text-white'>
                <h2>Oops! something went wrong...</h2>
              </div>
            </div>
            <div className='flex flex-row justify-center'>
              <Button
                className='bg-skinwalletPink w-max uppercase text-dark-14 hover:opacity-50 cta-clip-path'
                heightClass='h-12'
                text='continue shopping'
                onClick={() => replace('/market')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
