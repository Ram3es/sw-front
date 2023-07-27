import { type HTMLAttributes } from 'react'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'

interface IArrowProps extends HTMLAttributes<HTMLDivElement> {
  isLeftArrow?: boolean
}

const SliderArrow = ({ className, style, onClick, isLeftArrow }: IArrowProps) => {
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <Chevron className={`${isLeftArrow ? 'rotate-90 ' : '-rotate-90'} h-7 absolute top-0 fill-graySecondary hover:fill-white duration-200 cursor-pointer ` }/>
    </div>

  )
}

export default SliderArrow
