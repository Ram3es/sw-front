import { type FC } from 'react'
import { classNames } from '../helpers/className'

interface ICardWrapperProps {
  isSelected: boolean
  onSelect: () => void
  children: JSX.Element
  additionalClass?: string
  isNotActive?: boolean
}

const CardWrapper: FC<ICardWrapperProps> = ({ children, isSelected, additionalClass, isNotActive, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={classNames('w-full h-full border-b-[3px] border-darkGrey card-clip-path overflow-hidden relative',
        isNotActive ? 'cursor-default' : 'cursor-pointer hover:bg-darkGrey',
        isSelected ? 'border-swViolet border-2' : 'border-darkGrey border-2 ',
        additionalClass ?? '')}
  >
      <span className={classNames('absolute w-[10px] border-t-2 -right-[2px] top-[3px] rotate-45',
        isSelected ? 'border-swViolet ' : 'border-darkGrey')}/>
      <span className={classNames('absolute  w-[10px]  border-t-2 -left-[2px] bottom-[1px] rotate-45',
        isSelected ? 'border-swViolet ' : 'border-darkGrey')}/>
        {children}
  </div>
  )
}

export default CardWrapper
