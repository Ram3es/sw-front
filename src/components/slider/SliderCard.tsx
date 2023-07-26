import { useRef, type FC, type PropsWithChildren, useEffect } from 'react'
import Slider, { type Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ISliderProps extends PropsWithChildren {
  settings: Partial<Settings>
}

const SliderCard: FC<ISliderProps> = ({ children, settings }) => {
  const sliderRef = useRef<Slider | null>(null)

  useEffect(() => {
    if (sliderRef.current) {
      const slickList = sliderRef.current.innerSlider?.list
      slickList?.classList.add('py-8')

      const slickTrackEl = slickList?.querySelector('.slick-track')
      slickTrackEl?.classList.add('card')
    }
  }, [])

  return (
        <Slider ref={sliderRef} {...settings}>
            {children}
        </Slider>
  )
}
export default SliderCard
