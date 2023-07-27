import { type FC, type PropsWithChildren } from 'react'
import Slider, { type Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ISliderProps extends PropsWithChildren {
  settings: Partial<Settings>
}

const SliderCard: FC<ISliderProps> = ({ children, settings }) => {
  return (
        <Slider {...settings}>
            {children}
        </Slider>
  )
}
export default SliderCard
