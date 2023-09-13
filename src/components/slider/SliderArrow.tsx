import ChevronDown from '../icons/ChevronDown'
import { CustomArrowProps } from 'react-slick';

interface IArrowProps extends CustomArrowProps {
  isLeftArrow?: boolean
}

const SliderArrow = ({ className, style, onClick, isLeftArrow, currentSlide, slideCount, ...props }: IArrowProps) => {
  return (
    <div
      {...props}
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <ChevronDown className={`${isLeftArrow ? 'rotate-90 ' : '-rotate-90'} h-7 absolute top-0 fill-graySecondary hover:fill-white duration-200 cursor-pointer ` }/>
    </div>

  )
}

export default SliderArrow
