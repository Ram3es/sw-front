import { type HTMLAttributes } from 'react'
import { type Settings } from 'react-slick'
import { ReactComponent as Chevron } from '../assets/chevron-down.svg'

interface IArrowProps extends HTMLAttributes<HTMLDivElement> {
  isLeftArrow?: boolean
}

const CustomArrow = ({ className, style, onClick, isLeftArrow }: IArrowProps) => {
  return <div
            className={`${className ?? ''} `}
            style={{ ...style }}
            onClick={onClick}>
               <Chevron className={`${isLeftArrow ? 'rotate-90 ' : '-rotate-90'} h-7 absolute top-0 fill-graySecondary hover:fill-white duration-200 cursor-pointer  ` }/>
            </div>
}

export const SETTINGS: Partial<Settings> = {
  infinite: false,
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: false,
  nextArrow: <CustomArrow />,
  prevArrow: <CustomArrow isLeftArrow />,
  responsive: [
    {
      breakpoint: 1286,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 1000,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 706,
      settings: { slidesToShow: 1 }
    }
  ]
}

export const newlySliderSettings = {
  ...SETTINGS,
  slidesToShow: 6,
  responsive: [
    {
      breakpoint: 1286,
      settings: { slidesToShow: 5 }
    },
    {
      breakpoint: 1080,
      settings: { slidesToShow: 4 }
    },
    {
      breakpoint: 900,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 706,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 520,
      settings: { slidesToShow: 1 }
    }
  ]

}
