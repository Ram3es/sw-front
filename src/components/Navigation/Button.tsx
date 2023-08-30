import { type ReactNode } from 'react'

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IButton {
  text: string
  className?: string
  icon?: any
  iconRight?: boolean
  heightClass?: string
  disabled?: boolean
  children?: ReactNode
  onClick?: () => void
}

export const Button = ({ text = '', className = '', heightClass, icon, iconRight = false, onClick, disabled, children }: IButton) => {
  return (
    <button
      className={classNames(
        'button font-Barlow px-4 lg:px-0 xl:px-4 tracking-[1.12px] flex',
        className ?? ' text-[14px] ',
        heightClass ?? 'h-[32px]'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      { icon && !iconRight && <span className="pr-[8px]">{icon}</span> }
      <span className='text'>{ text }</span>
      { children }
      { icon && iconRight && <span className="pl-[8px]">{icon}</span> }
    </button>
  )
}
