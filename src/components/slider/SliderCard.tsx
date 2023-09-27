'use client'
import { type FC, type PropsWithChildren } from 'react'
import Slider, { type Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ItemCard from '../Content/ItemCard'
import EmptyCard from '../Content/EmptyCard'
import { useCartContext } from '@/context/CartContext'
import { ECardVariant, IOffersCard } from '@/types/Card'
import { IMAGE_ROOT_URL } from '@/constants/strings'
import SliderArrow from '../../components/slider/SliderArrow'
import { useAppContext } from '@/context/AppContext'

interface ISliderProps extends PropsWithChildren {
  settings: Partial<Settings>,
  items: IOffersCard[]
}

const SliderCard: FC<ISliderProps> = ({ items, settings }) => {
  const { addToCart } = useCartContext()
  const { user } = useAppContext()
  const settingsWithArrow = { 
    nextArrow: <SliderArrow />,
    prevArrow: <SliderArrow isLeftArrow />,  
    ...settings 
  }


  
  return (
        <Slider {...settingsWithArrow}>
            {items.map((item) =>
              <ItemCard
                key={item.inventoryItemId}
                id={item.inventoryItemId}
                variant={ECardVariant.market}
                isTradable={true}
                name={item.name}
                type={item.typeName}
                condition={item.wearFloat}
                price={item.price.amount}
                steamPrice={item.steamPrice.amount}
                image={IMAGE_ROOT_URL.concat(item.imageUrl)}
                onClick={() => {
                  if (user?.id) addToCart(item)
                }}
                submitFn={() => {}}
                  />
            )}
                <EmptyCard />
        </Slider>
  )
}
export default SliderCard
