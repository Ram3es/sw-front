'use client'
import { type FC, type PropsWithChildren } from 'react'
import Slider, { type Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ECardVariant, IOffersCard } from '@/types/Card'
import ItemCard from '../Content/ItemCard'
import { IMAGE_ROOT_URL } from '@/constants/strings'
import { buyItems } from '@/services/market/market'
import EmptyCard from '../Content/EmptyCard'

interface ISliderProps extends PropsWithChildren {
  settings: Partial<Settings>,
  items: IOffersCard[]
}

const SliderCard: FC<ISliderProps> = ({ items, settings }) => {
  return (
        <Slider {...settings}>
            {items.map(({ inventoryItemId, imageUrl, name, price, typeName, wearFloat, steamPrice }) =>
              <ItemCard
                key={inventoryItemId}
                id={inventoryItemId}
                variant={ECardVariant.market}
                isTradable={true}
                name={name}
                type={typeName}
                condition={wearFloat}
                price={price.amount}
                steamPrice={steamPrice.amount}
                image={IMAGE_ROOT_URL.concat(imageUrl)}
                onClick={() => {
                  void buyItems({
                    assetIds: [inventoryItemId]
                  })
                }}
                submitFn={() => {}}
                  />
            )}
                <EmptyCard />
        </Slider>
  )
}
export default SliderCard
