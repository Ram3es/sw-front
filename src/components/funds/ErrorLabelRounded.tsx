import ExclamationTriangleIcon from '../icons/ExclamationTriangle'
import { classNames } from '../../helpers/className'

const ErrorLabelRounded = ({ isError, message, className, icon }: { isError: boolean, message?: string, className?: string, icon?: JSX.Element }) => {
  return (
        <div className={classNames('w-max rounded-full ',
          isError ? 'block' : 'hidden',
          className ?? 'text-swOrange border-swOrange border text-sm'

        )}>
            <div className='w-max flex items-center gap-2 py-1 px-3 rounded-full border border-darkSecondary  '>
              {icon ?? <ExclamationTriangleIcon /> } 
                <p className='uppercase tracking-[1.12px] leading-[1px] '>{message}</p>
            </div>

        </div>
  )
}

export default ErrorLabelRounded
