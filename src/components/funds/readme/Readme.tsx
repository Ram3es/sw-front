import { useState } from 'react'
import Bullhorn from '../../icons/Bullhorn'
import MinusIcon from '../../icons/MinusIcon'
import PlusIcon from '../../icons/PlusIcon'

const Readme = ({ children }: { children: JSX.Element }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
        <div className='flex flex-col gap-4 p-6 bg-dark-14 text-graySecondary text-sm  '>
            <div
              onClick={() => { setIsOpen(boolean => !boolean) } }
              className='w-full flex justify-between items-center group hover:text-white cursor-pointer duration-200 '
            >
                <div className='flex items-center gap-2 px-3 py-1 border group-hover:border-white  border-graySecondary  rounded-3xl'>
                    <Bullhorn />
                    <span className='uppercase  tracking-[1.12px]'>read me</span>
                </div>
                    {isOpen ? <MinusIcon /> : <PlusIcon /> }
            </div>
            {isOpen &&
                <div className='flex flex-col gap-4 leading-5 [&>p]:font-normal' >
                  {children}
                </div>
            }
        </div>
  )
}

export default Readme
