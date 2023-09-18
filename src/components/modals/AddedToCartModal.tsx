
import { useCartContext } from '@/context/CartContext'
import { Button } from '../Navigation'
import { IMAGE_ROOT_URL } from '@/constants/strings'
import CloseIcon from '../icons/CloseIcon'
import ItemSelectedCard from '../Content/ItemSelectedCard'
import { classNames } from '@/helpers/className'
import CheckUnfilled from '../icons/checkout/CheckUnfilled'

const AddedToCartModal = () => {
  const { lastAddedItem, cartItems, setLastAddedItem } = useCartContext()
  
  return (
    <>  
      { lastAddedItem ? 
        <div className='fixed right-0 bg-darkGrey w-[368px] p-6'>
          <div  className='flex justify-between pb-4'>
            <div className='flex items-center gap-2 text-xs font-Barlow text-[#18E86B]'>
              <CheckUnfilled />
              <span>Added to Cart</span>
            </div>     
            <div onMouseDown={() => setLastAddedItem(null)} className='group-focus-within:block cursor-pointer text-graySecondary hover:text-white duration-200'>
              <CloseIcon  className='w-3 h-[18px] ' />
            </div>       
          </div>
          <ItemSelectedCard
            key={lastAddedItem.inventoryItemId}
            image={IMAGE_ROOT_URL.concat(lastAddedItem.imageUrl)}
            price={lastAddedItem.price.amount}
            steamPrice={lastAddedItem.steamPrice.amount}
            id={lastAddedItem.inventoryItemId}
            name={lastAddedItem.name}
            condition={lastAddedItem.wearFloat}
          />
          <div className='w-full flex flex-col justify-center gap-4'>
            <Button
              className='w-full bg-skinwalletPink uppercase justify-center text-dark-14 hover:opacity-50 cta-clip-path mr-6'
              heightClass='h-10'
              text='checkout'
            />
            <div className=' w-full  relative overflow-hidden hover button '>
              <Button
                className='w-full bg-black border border-graySecondary uppercase justify-center text-graySecondary hover:opacity-50 cta-clip-path'
                heightClass='h-10'
                text='view cart'
              />
              <div className='absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45' />
            </div>
          </div>                  
        </div>
      : null }        
    </>
  )
}

export default AddedToCartModal
