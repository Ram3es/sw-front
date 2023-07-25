import React, { useRef, type FC, type PropsWithChildren, useEffect, useState, useCallback, useMemo } from 'react'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import Slider, { type Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ISliderProps extends PropsWithChildren {
  length: number
}

const SliderCard: FC<ISliderProps> = ({ children, length }) => {
  const [wrapElement, setWrapElement] = useState<HTMLDivElement>()
  const [slidesToShow, setSlideToShow] = useState(1)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const sliderRef = useRef<Slider | null>(null)

  const settings: Partial<Settings> = useMemo(() => ({
    infinite: false,
    speed: 200,
    slidesToShow,
    slidesToScroll: 1,
    draggable: false,
    arrows: false,
    afterChange: (slide) => { setCurrentSlide(slide) }
  }), [slidesToShow])

  const getSlideToShow = useCallback(() => {
    if (wrapElement?.clientWidth) {
      const slides = Math.floor(wrapElement?.clientWidth / 200)
      setSlideToShow(slides)
    }
  }, [wrapElement])

  useEffect(() => {
    if (sliderRef.current) {
      const slickList = sliderRef.current.innerSlider?.list
      slickList?.classList.add('py-8')
      setWrapElement(slickList)
    }
  }, [])

  useEffect(() => {
    if (wrapElement) {
      getSlideToShow()
      window.addEventListener('resize', getSlideToShow)
    }
    return () => { window.removeEventListener('resize', getSlideToShow) }
  }, [wrapElement])

  return (
    <div className=' w-full flex justify-between items-center relative '>
        <Chevron onClick={() => sliderRef.current?.slickPrev()} className={`${currentSlide === 0 ? 'invisible' : 'visible'}  h-7 fill-graySecondary hover:fill-white duration-200 cursor-pointer rotate-90 absolute top-[40%] -left-10 sm:-left-20 ` }/>
        <Slider className='w-full' ref={sliderRef} {...settings}>
            {children}
        </Slider>
        <Chevron onClick={() => sliderRef.current?.slickNext()} className={`${(currentSlide + slidesToShow) === length ? 'invisible' : 'visible'} fill-graySecondary hover:fill-white duration-200 cursor-pointer h-7 -rotate-90  absolute top-[40%] -right-10 sm:-right-20  ` } />
    </div>
  )
}

export default SliderCard
