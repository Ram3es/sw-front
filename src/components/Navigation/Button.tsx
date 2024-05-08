'use client'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: any
  iconRight?: boolean
  heightClass?: string
  children?: ReactNode
}

export const Button = ({ text = '', heightClass, icon, iconRight = false, children, className, ...props }: IButton) => {
  return (
    <button
      className={classNames(
        'button font-Barlow px-4 lg:px-0 xl:px-4 tracking-[1.12px] flex',
        className ?? ' text-[14px] ',
        heightClass ?? 'h-[32px]'
      )}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {icon && !iconRight && <span className="pr-[8px]">{icon}</span>}
      <span className="text py-[10px]">{text}</span>
      {children}
      {icon && iconRight && <span className="pl-[8px]">{icon}</span>}
    </button>
  )
}
