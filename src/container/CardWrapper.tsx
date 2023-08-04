import { type FC } from 'react'
import { classNames } from '../helpers/className'

interface ICardWrapperProps {
  isSelected: boolean
  onSelect: () => void
  children: JSX.Element
  additionalClass?: string
}

const CardWrapper: FC<ICardWrapperProps> = ({ children, isSelected, additionalClass, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={classNames('w-full h-full border-b-[3px] border-darkGrey card-clip-path hover:bg-darkGrey  cursor-pointer overflow-hidden relative',
        isSelected ? 'border-swViolet border-2' : 'border-darkGrey border-2 ',
        additionalClass ?? '')}
  >
      <span className={classNames('absolute w-[10px] border-t-2 -right-[3px] top-[2px] rotate-45',
        isSelected ? 'border-swViolet ' : 'border-darkGrey')}/>
      <span className={classNames('absolute  w-[10px]  border-t-2 -left-[2px] bottom-[1px] rotate-45',
        isSelected ? 'border-swViolet ' : 'border-darkGrey')}/>
        {children}
  </div>
  )
}

export default CardWrapper
