import { type FC } from 'react'
import { classNames } from '../helpers/className'

interface IModalWrapperProps {
  children: JSX.Element
  className?: string
}

const ModalWrapper: FC<IModalWrapperProps> = ({ children, className }) => {
  return (
        <div className={classNames('fixed inset-0 w-full h-full bg-darkSecondary/80 z-[100] ',
          className ?? '')}>
            {children}
        </div>
  )
}

export default ModalWrapper
