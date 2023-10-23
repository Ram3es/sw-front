import { useRef, type FC, useEffect } from 'react'
import { classNames } from '../helpers/className'

interface IModalWrapperProps {
  children: JSX.Element
  className?: string
  closeModal?: () => void
}

const ModalWrapper: FC<IModalWrapperProps> = ({ children, className, closeModal }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: MouseEvent) => {
    if (!contentRef.current?.contains(e.target as Node)) {
      closeModal?.()
    }
  }
  useEffect(() => {
    wrapperRef.current?.addEventListener('click', handleOutsideClick)
    return () => {
      wrapperRef.current?.removeEventListener('click', handleOutsideClick)
    }
  }, [])
  return (
        <div ref={wrapperRef} className={classNames('fixed inset-0 w-full h-full bg-darkSecondary/80 z-50 ',
          className ?? '')}>
            <div ref={contentRef}>
              {children}
            </div>
        </div>
  )
}

export default ModalWrapper
