
import { useCartContext } from '@/context/CartContext'
import { Button } from '../Navigation'
import { IMAGE_ROOT_URL } from '@/constants/transactions'
import CloseIcon from '../icons/CloseIcon'
import ItemSelectedCard from '../Content/ItemSelectedCard'
import { classNames } from '@/helpers/className'
import CheckUnfilled from '../icons/checkout/CheckUnfilled'
import Link from 'next/link'

const AddedToCartModal = () => {
  const { lastAddedItem, cartItems, setLastAddedItem } = useCartContext()
  
  return (
    <>  
        <div className={classNames('z-[70] fixed right-0 bg-darkGrey w-[368px] text-graySecondary p-6 popup',
        lastAddedItem ? " open" : ""
        )}>
          <div  className='flex justify-between pb-4'>
            <div className='flex items-center gap-2 text-xs font-Barlow text-[#18E86B]'>
              <CheckUnfilled />
              <span>Added to Cart</span>
            </div>     
            <div onMouseDown={() => setLastAddedItem(null)} className='group-focus-within:block cursor-pointer text-graySecondary hover:text-white duration-200'>
              <CloseIcon  className='w-3 h-[18px] ' />
            </div>       
          </div>
          { lastAddedItem ? 
              <ItemSelectedCard
                key={lastAddedItem.inventoryItemId}
                image={IMAGE_ROOT_URL.concat(lastAddedItem.imageUrl)}
                price={lastAddedItem.price.amount}
                steamPrice={lastAddedItem.steamPrice.amount}
                id={lastAddedItem.inventoryItemId}
                name={lastAddedItem.name}
                condition={lastAddedItem.wearFloat}
              /> 
            : <div className='h-[175px]' ></div>
          }
          <div className='w-full flex flex-col justify-center gap-4'>
            <Link href={'/cart/checkout'}>
              <Button
                className='w-full bg-skinwalletPink uppercase justify-center text-dark-14 hover:opacity-50 cta-clip-path mr-6'
                heightClass='h-10'
                text='checkout'
              />
            </Link>
            <div className=' w-full  relative overflow-hidden hover button '>
              <Link href={'/cart'}>
                <Button
                  className='w-full bg-black border border-graySecondary uppercase justify-center text-graySecondary hover:opacity-50 cta-clip-path'
                  heightClass='h-10'
                  text='view cart'
                />
              </Link>
              <div className='absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45' />
            </div>
          </div>     
        </div>
    </>
  )
}

export default AddedToCartModal
