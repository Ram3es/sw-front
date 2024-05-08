import { type FC, type PropsWithChildren } from 'react'
import { classNames } from '../helpers/className'

interface IPopupWrapperProps extends PropsWithChildren {
  wrapperClasses?: string
}

const PopupWrapper: FC<IPopupWrapperProps> = ({ children, wrapperClasses }) => {
  return (
        <div className={classNames(' p-6 bg-graySecondary cta-clip-path ',
          wrapperClasses ?? '')}>
            {children}

        </div>
  )
}

export default PopupWrapper
