import { type PropsWithChildren, type FC } from 'react'
import EditPencil from '../components/icons/EditPencil'
import { classNames } from '../helpers/className'

interface IFieldProps extends PropsWithChildren {
  title: string
  editableFn?: () => void
  icon?: JSX.Element
  wrapperClasses?: string
}

const SettingField: FC<IFieldProps> = ({ children, title, icon, wrapperClasses, editableFn }) => {
  return (
        <div className={classNames('w-full flex justify-between p-6 text-graySecondary ',
          wrapperClasses ?? 'bg-darkGrey'
        )}>
          <div className='flex flex-col gap-y-2 sm:flex-row items-start sm:items-center w-full text-lg'>
            <div className='min-w-[200px]  flex gap-2 small-caps self-start tracking-[1.44px]'>
              <span className='mb-0.5 '>{title}</span>
             {icon}
            </div>
            {children}
          </div>
          <div onClick={() => { editableFn?.() }} className={editableFn ? 'block ml-4' : 'hidden' }>
            <EditPencil className='cursor-pointer hover:text-white duration-200  mt-1' />
          </div>
        </div>
  )
}

export default SettingField