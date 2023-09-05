import { classNames } from '../../helpers/className'
import ShieldCheck from '../icons/settings/ShieldCheck'

const SuccessLabel = ({ message, className, icon }: { message?: string, className?: string, icon?: JSX.Element }) => {
  return (
          <div className={classNames('w-max rounded-2xl ',
            className ?? 'text-swLime border-swLime border text-sm'

          )}>
              <div className='w-full flex items-center gap-2 py-0.5 px-3 '>
                  {icon ?? <ShieldCheck /> }
                  <span className='uppercase tracking-[1.12px] '>{message}</span>
              </div>

          </div>
  )
}

export default SuccessLabel