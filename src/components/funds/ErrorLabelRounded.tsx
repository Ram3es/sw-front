import ExclamationTriangleIcon from '../icons/ExclamationTriangle'
import { classNames } from '../../helpers/className'

const ErrorLabelRounded = ({ isError, message }: { isError: boolean, message?: string }) => {
  return (
        <div className={classNames('w-max rounded-full border border-swOrange text-sm text-swOrange',
          isError ? 'block' : 'hidden'
        )}>
            <div className='w-max flex items-center gap-2 py-1 px-3 rounded-full border text border-darkSecondary  '>
                <ExclamationTriangleIcon />
                <p className='uppercase tracking-[1.12px] leading-[1px] '>{message}</p>
            </div>

        </div>
  )
}

export default ErrorLabelRounded
