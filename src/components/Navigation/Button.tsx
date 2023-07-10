import { type ReactNode } from 'react'

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IButton {
  text: string
  className?: string
  icon?: any
  iconRight?: boolean
  disabled?: boolean
  children?: ReactNode
  onClick?: () => void
}

export const Button = ({ text = '', className = '', icon, iconRight = false, onClick, disabled, children }: IButton) => {
  return (
    <button
      className={classNames(
        'button font-["Barlow"] h-[32px] px-[16px] tracking-[1.12px] flex',
        className ?? ' text-[14px] '
      )}
      onClick={onClick}
      disabled={disabled}
    >
      { icon && !iconRight && <span className="pr-[8px]">{icon}</span> }
      { text }
      { children }
      { icon && iconRight && <span className="pl-[8px]">{icon}</span> }
    </button>
  )
}
