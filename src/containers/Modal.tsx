import { type FC, type PropsWithChildren } from 'react'

const ModalWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
        <div className='fixed inset-0 w-full h-full bg-darkSecondary/80 z-[100] '>
            {children}
        </div>
  )
}

export default ModalWrapper
