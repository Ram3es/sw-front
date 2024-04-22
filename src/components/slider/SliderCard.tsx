'use client'
import { type FC, type PropsWithChildren } from 'react'
import Slider, { type Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ItemCard from '../Content/ItemCard'
import EmptyCard from '../Content/EmptyCard'
import { useCartContext } from '@/context/CartContext'
import { ECardVariant, IOfferInventory, IOffersCard } from '@/types/Card'
import SliderArrow from '../../components/slider/SliderArrow'
import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import { getImageURL } from '@/helpers/getImageURL'

interface ISliderProps extends PropsWithChildren {
  settings: Partial<Settings>,
  items: IOfferInventory[]
  withEmptySlide?: boolean 
}

const SliderCard: FC<ISliderProps> = ({ items, settings, withEmptySlide = true }) => {
  const { addToCart } = useCartContext()
  const { push } = useRouter()
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
                key={item.assetid}
                id={item.assetid}
                variant={ECardVariant.market}
                isTradable={true}
                name={item.name}
                type={item.qualities.type}
                condition={0.2087172418832779}
                price={item.price.buy}
                steamPrice={item.price.buy}
                image={getImageURL(item.icon_url)}
                colorName={item.qualities.name_color}
                onClick={() => {
                  push(`/market/offers/${item.assetid}`)
                }}
                submitFn={(e) => {
                  e.stopPropagation()
                  if (user?.id) addToCart(item)
                }}
                  />
            )}
                { withEmptySlide && <EmptyCard /> }
        </Slider>
  )
}
export default SliderCard
